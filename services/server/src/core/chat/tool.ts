import { ModelName } from '@/constants/model'
import { getEnvVars } from '@/env'
import { FlowChatModel, Message } from '@/utils/model'
import {
  ConversationalRetrievalQAChain,
  LLMChain,
  LLMChainInput,
} from 'langchain/chains'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { VectorStoreRetrieverMemory, getBufferString } from 'langchain/memory'
import { PromptTemplate } from 'langchain/prompts'
import { AIMessage, BaseMessage, HumanMessage } from 'langchain/schema'
import { DynamicTool } from 'langchain/tools'
import { QdrantVectorStore } from 'langchain/vectorstores/qdrant'
import { qdrant } from '@/clients/qdrant'
import { ChatPygmalion } from '@/models/pygmalion'
import { ChatAssistant } from '@/models/assistant'
import { MODEL_TO_CHAIN_MEMORY_SYS_PROMPT } from '@/constants/sysPrompt'
import { destructureMemoryEntry } from '@/utils/memory'
import { CustomChatGoogleGenerativeAI } from '@/models/gemini'
import { ImageModel } from '@/constants/imageGeneration'
import {
  generateImageDalle,
  generateImageLepton,
  generateImagePollinations,
} from './service'
import {
  convertRequestToDALLE2IconRequest,
  convertRequestToDALLE3Request,
  convertRequestToLeptonRequest,
} from './utils'

export const generateImageGenerationTool = ({
  streamingCallback,
  modelName,
  messages,
  imageModel = ImageModel.DALLE3,
}: {
  streamingCallback: (token: string) => void
  modelName: ModelName
  messages: BaseMessage[]
  imageModel?: ImageModel
}) => {
  const { OPENAI_API_KEY } = getEnvVars()
  return new DynamicTool({
    name: 'image generation',
    description: `Useful for when you need to generate an image with a prompt. If the response incudes scene or character description, also use this tool to generate image about it \n
    Input: A prompt describing the image\n
    Output: Only the url of the generated image
    `,
    func: async (input: string) => {
      streamingCallback('generation image...')
      const newLLM = new ChatOpenAI({
        openAIApiKey: OPENAI_API_KEY,
        modelName:
          modelName === ModelName.GPT_4 || modelName === ModelName.GPT_4_TURBO
            ? ModelName.GPT_4
            : ModelName.GPT_3_5_TURBO,
      })
      const newTemplate = new PromptTemplate({
        template:
          'Give me one good and detailed prompt to generate the image using Stable Diffusion for {input} and Original conversation: {chat_history}. The result should just include the prompt. No explanation. Example: <example>H: Give me one good and detailed prompt to generate the image using Stable Diffusion for an animal swimming in a lake. \n\n A: A photo of a brown bear swimming through a large, clear blue mountain lake surrounded by tall evergreen trees and snow capped mountains in the background. The bear is mid-stroke, with its head above the water and its front legs extended. Sparkling sunlight reflects off the smooth water. The image is sharply focused and highly detailed.</example>',
        inputVariables: ['input', 'chat_history'],
      })
      const llmChain = new LLMChain({
        llm: newLLM,
        prompt: newTemplate,
      })
      const res = await llmChain.call({
        input,
        chat_history: getBufferString(messages),
      })
      let url = ''

      const body: {
        model: ImageModel
        prompt: string
      } = {
        model: imageModel,
        prompt: res.text,
      }

      switch (body.model) {
        case ImageModel.Pollinations:
          url = await generateImagePollinations({
            words: body.prompt,
            width: 1024,
            height: 1024,
          })
          break
        case ImageModel.DALLE3:
          url = await generateImageDalle(convertRequestToDALLE3Request(body))
          break
        case ImageModel.ICON:
          url = await generateImageDalle(
            convertRequestToDALLE2IconRequest(body)
          )
          break
        default:
          url = await generateImageLepton(convertRequestToLeptonRequest(body))
      }

      streamingCallback('generation end')
      streamingCallback(`![image](${url})`)
      return `![image](${url})`
    },
  })
}

export const generateChatTool = ({
  supportDataset,
  documentIds,
  chatModel,
  messages = [],
  streamingCallback,
  memory,
  history,
}: {
  supportDataset: boolean
  documentIds: string[]
  chatModel: FlowChatModel
  streamingCallback: (token: string) => void
  messages?: BaseMessage[]
  memory?: string
  history?: Message[]
}) => {
  const { OPENAI_API_KEY } = getEnvVars()
  const noMemoryRunner = async (input: string) => {
    const newMessage = new HumanMessage({
      content: input,
    })
    const callRes = await chatModel.call([...messages, newMessage])
    streamingCallback('\n')
    return callRes.content as string
  }
  const noMemoryWithDatasetRunner = async (input: string) => {
    const retriever = await generateVectorStoreRetriever(documentIds)
    const datasetModel = chatModel as Exclude<
      FlowChatModel,
      ChatPygmalion | ChatAssistant
    >
    const chain = ConversationalRetrievalQAChain.fromLLM(
      datasetModel,
      retriever,
      {
        questionGeneratorChainOptions: {
          llm: new ChatOpenAI({
            openAIApiKey: OPENAI_API_KEY,
          }),
        },
        returnSourceDocuments: true,
      }
    )
    const callRes = await chain.call({
      question: input,
      chat_history: messages,
    })
    return callRes.content ?? callRes.text
  }
  const memoryLLM: Exclude<
    FlowChatModel,
    ChatPygmalion | ChatAssistant | CustomChatGoogleGenerativeAI
  > = chatModel as Exclude<
    FlowChatModel,
    ChatPygmalion | ChatAssistant | CustomChatGoogleGenerativeAI
  >
  const memoryRunner = async (input: string) => {
    if (history === undefined) {
      return
    }
    const chainConfig: LLMChainInput = {
      llm: memoryLLM,
      prompt: MODEL_TO_CHAIN_MEMORY_SYS_PROMPT,
    }
    if (documentIds.length > 0) {
      const retriever = await generateVectorStoreRetriever(documentIds)
      chainConfig.memory = new VectorStoreRetrieverMemory({
        vectorStoreRetriever: retriever,
      })
    }
    const chain = new LLMChain(chainConfig)
    const { index: historyStartIndex, text: summary } =
      destructureMemoryEntry(memory)
    const chatHistoryFromMemory = history.slice(historyStartIndex + 1)
    const res = await chain.call({
      question_input: input,
      summary,
      chat_history: chatHistoryFromMemory,
    })
    const message = new AIMessage(res.content ?? res.text)
    return message.content
  }
  const runner = memory
    ? memoryRunner
    : supportDataset
      ? noMemoryWithDatasetRunner
      : noMemoryRunner
  return new DynamicTool({
    name: 'normal chat',
    description: `use this tool for general chat\n
      Input: the question and history\n
      Output: the answer
      `,
    func: runner,
  })
}

export const generateVectorStoreRetriever = async (documentIds: string[]) => {
  const index = generateDocumentIndex(documentIds)
  const { OPENAI_API_KEY } = getEnvVars()
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    new OpenAIEmbeddings({
      openAIApiKey: OPENAI_API_KEY,
    }),
    {
      client: qdrant,
      collectionName: 'documents',
    }
  )

  return vectorStore.asRetriever(index?.fetch_count, index?.filter)
}

const generateDocumentIndex = (documentsIds: string[]) => ({
  fetch_count: 10,
  filter: {
    must: [
      {
        key: 'metadata.documentId',
        match: {
          any: documentsIds,
        },
      },
    ],
  },
})
