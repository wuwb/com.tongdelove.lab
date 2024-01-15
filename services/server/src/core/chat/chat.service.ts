import { ModelName } from '@/constants/model'
import {
    ChatLLMResult,
    FlowChatModel,
    Message,
    constructMessages,
    convertChatAPIError,
    customOpenAIGetNumTokensFromMessages,
    getAnthropicTokenListFromMessages,
    getChatModel,
    getTotalTokensFromCountPerMessage as getTotalTokensFromTokenCountPerMessage,
    convertMessageContentToString,
} from '@/utils/model'
import { VectorStoreRetrieverMemory, getBufferString } from 'langchain/memory'
import {
    ConversationalRetrievalQAChain,
    LLMChainInput,
    LLMChain,
} from 'langchain/chains'
import {
    AIMessage,
    BaseMessage,
    ChainValues,
    SystemMessage,
} from 'langchain/schema'
import { MODEL_TO_CHAIN_MEMORY_SYS_PROMPT } from '@/constants/sysPrompt'
import prisma from '@/clients/prisma'
import { getContext } from '@/middlewares/context'

import { destructureMemoryEntry } from '@/utils/memory'
import { hashString } from '@/utils/hash'
import redisClient from '@/clients/redis'
import fetch from 'node-fetch'
import {
    CDN_URL,
    FLOW_CHAT_IMAGES_BUCKETNAME,
    USER_AUDIO_S3_BUCKET,
} from '@/constants/s3'
import { getEnvVars } from '@/env'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { timedPromise } from '@/utils/promise'
import { z } from 'zod'
import { ChatPygmalion } from '@/models/pygmalion'
import { cumulativeSum } from '@/utils/array'
import {
    DALLE3Options,
    LeptonImageGenerationOptions,
    PollinationsOptions,
} from './types'
import {
    TTSProvider,
    convertVoiceIDtoOpenAI,
    defaultVoiceOptions,
    openAIVoiceOptions,
    voiceOptionsSchema,
} from '@/utils/audio'
import {
    awsS3Client,
    constructPutCommand,
    generatePresignedUrl,
    s3Client,
} from '@/clients/s3'
import { generateTempFilePath } from '@/utils/file'
import fs from 'fs'
import OpenAI from 'openai'
import { Assistant } from 'openai/resources/beta/assistants/assistants'
import { ChatAssistant, OpenAIImageGeneratedFn } from '@/models/assistant'
import { OpenAITTSModels } from '@/utils/constant'
import { ImageGenerateParams } from 'openai/resources/images'
import {
    ChatDocument,
    Conversation,
    Document,
    DocumentStatus,
    Prisma,
    Prompt,
    PromptOption,
    User,
} from '@prisma/client'
import mime from 'mime-types'
import { generateAgentExecutor } from './agent'
import {
    generateChatTool,
    generateImageGenerationTool,
    generateVectorStoreRetriever,
} from './tool'
import { ImageModel } from '@/constants/imageGeneration'

const { ELEVENLABS_API_KEY } = getEnvVars()

export async function generateAudioElevenLabs(
    message: string,
    voiceId: string,
    options?: z.infer<typeof voiceOptionsSchema>
) {
    const { logger } = getContext()
    const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?optimize_streaming_latency=4`,
        {
            method: 'POST',
            headers: {
                accept: 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
                text: message,
                model_id: 'eleven_multilingual_v2',
                voice_settings: {
                    ...defaultVoiceOptions,
                    ...options,
                },
            }),
        }
    )
    if (!response.ok) {
        const errMsg = await response.text()
        logger.error(errMsg)
        throw new Error('Something went wrong')
    }
    return await response.arrayBuffer()
}

export async function generateAudioOpenAI(
    voice: openAIVoiceOptions,
    message: string
) {
    const { OPENAI_API_KEY } = getEnvVars()
    const { logger } = getContext()
    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
    })
    const response = await openai.audio.speech.create({
        model: OpenAITTSModels.TTS1,
        voice,
        input: message,
    })
    if (response.statusText !== 'OK') {
        const errMsg = await response.text()
        logger.error(errMsg)
        throw new Error('Something went wrong')
    }

    return await response.arrayBuffer()
}

export async function uploadAudio(
    message: string,
    voiceId: string,
    provider: TTSProvider,
    options?: z.infer<typeof voiceOptionsSchema>
): Promise<string> {
    const start = new Date().getTime()
    const { logger, userId } = getContext()
    const cacheKey = `voice-gen:${hashString(message)}:${voiceId}`
    const cachedUrl = await redisClient.get(cacheKey)
    if (cachedUrl) {
        return cachedUrl
    }

    let audioData: ArrayBuffer
    if (provider === TTSProvider.OPENAI) {
        audioData = await generateAudioOpenAI(
            convertVoiceIDtoOpenAI(voiceId),
            message
        )
    } else {
        audioData = await generateAudioElevenLabs(message, voiceId, options)
    }

    logger.debug(`Audio generation time taken: ${new Date().getTime() - start}`)

    const key = `audio/${userId ?? 'user'}-${new Date().toISOString()}.mp3`

    const params = {
        Bucket: USER_AUDIO_S3_BUCKET,
        Key: key,
        Body: Buffer.from(audioData),
        ContentType: 'audio/mpeg',
        ACL: 'public-read',
    }
    const url = `${CDN_URL}/${key}`

    // Upload the file to S3
    await Promise.all([
        awsS3Client.upload(params).promise(),
        redisClient.set(cacheKey, url, 'EX', 60 * 60 * 24 * 3), // 3d for now, cache longer for prod
    ])

    logger.debug(
        `Total audio generation time taken: ${new Date().getTime() - start}`
    )

    return url
}

export async function generateAudioElevenLabsStream(
    message: string,
    voiceId: string,
    options?: z.infer<typeof voiceOptionsSchema>
) {
    const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream?optimize_streaming_latency=4`,
        {
            method: 'POST',
            headers: {
                accept: 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
                text: message,
                model_id: 'eleven_multilingual_v2',
                voice_settings: {
                    ...defaultVoiceOptions,
                    ...options,
                },
            }),
        }
    )
    return response.body
}

export async function generateAudioOpenAIStream(
    voice: openAIVoiceOptions,
    message: string
) {
    const { OPENAI_API_KEY } = getEnvVars()
    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
    })
    const response = await openai.audio.speech.create({
        model: OpenAITTSModels.TTS1HD,
        voice,
        input: message,
    })
    return response.body
}

export async function uploadAudioStream(
    message: string,
    voiceId: string,
    provider: TTSProvider,
    options?: z.infer<typeof voiceOptionsSchema>
): Promise<{
    stream: NodeJS.ReadableStream
    audioUrl: string
}> {
    // Make a request to the Text-to-Speech API
    const start = new Date().getTime()
    const { userId, logger } = getContext()

    let stream: NodeJS.ReadableStream
    if (provider === TTSProvider.OPENAI) {
        stream = await generateAudioOpenAIStream(
            convertVoiceIDtoOpenAI(voiceId),
            message
        )
    } else {
        stream = await generateAudioElevenLabsStream(message, voiceId, options)
    }

    // Upload the stream to S3
    const key = `audio/${userId ?? 'user'}-${new Date().toISOString()}.mp3`
    const audioUrl = `${CDN_URL}/${key}`
    const params = {
        Bucket: USER_AUDIO_S3_BUCKET,
        Key: key,
        Body: stream,
        ContentType: 'audio/mpeg',
        ACL: 'public-read',
    }

    new Promise((resolve, reject) => {
        awsS3Client
            .upload(params)
            .on('httpUploadProgress', (evt) => {
                logger.info(`Progress: ${evt.loaded} of ${evt.total} bytes`)
            })
            .send((err: unknown, data: unknown) => {
                if (err) {
                    logger.error('Error uploading to S3:', err)
                    reject(err) // reject the Promise with error
                } else {
                    const result = z
                        .object({
                            Location: z.string(),
                        })
                        .safeParse(data)

                    let location = key
                    if (result.success) {
                        location = result.data.Location
                    }

                    logger.info(
                        'Successfully uploaded to S3:',
                        location,
                        ', Total time taken: ',
                        new Date().getTime() - start
                    )
                    const url = `${CDN_URL}/${key}`
                    resolve(url) // resolve the Promise with key
                }
            })
    })
        .then(() => {
            logger.info('Upload audio file into s3 success')
        })
        .catch((err) => {
            logger.error('Upload audio file into s3 failed', err)
        })

    return { stream, audioUrl }
}

export async function uploadImageToS3(
    imageData: Buffer,
    args:
        | LeptonImageGenerationOptions
        | PollinationsOptions
        | DALLE3Options
        | ImageGenerateParams
) {
    const tempFilePath = generateTempFilePath('png')
    fs.writeFileSync(tempFilePath, imageData)

    const key = `image-generation/${hashString(JSON.stringify(args))}.png`
    const params = {
        Bucket: 'flow-user-images',
        Key: key,
        Body: fs.createReadStream(tempFilePath),
    }

    try {
        const s3Response = await awsS3Client.upload(params).promise()
        const { Location } = s3Response
        return Location.replace(
            'flow-user-images.s3.us-west-1.amazonaws.com',
            'image-cdn.flowgpt.com'
        )
    } catch (error) {
        console.error('Error during S3 upload:', error)
        throw error
    } finally {
        fs.unlinkSync(tempFilePath)
    }
}

function getModel(model: ModelName): string {
    switch (model) {
        case ModelName.GPT_4:
            return 'gpt-4-0613'
        case ModelName.GPT_4_TURBO:
            return 'gpt-4-1106-preview' // https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo
        case ModelName.GPT_3_5_TURBO:
            return 'gpt-3.5-turbo-0613'
        case ModelName.GPT_3_5_TURBO_16K:
            return 'gpt-3.5-turbo-16k'
        case ModelName.GPT_3_5_LONG:
            return 'gpt-3.5-turbo-16k'
        case ModelName.GOOGLE_PALM_2:
            return 'models/chat-bison-001'
        case ModelName.GOOGLE_GEMINI:
            return 'gemini-pro'
        case ModelName.CLAUDE_INSTANT: // https://docs.anthropic.com/claude/reference/selecting-a-model
            return 'claude-instant-1'
        case ModelName.CLAUDE_V2:
            return 'claude-2'
        case ModelName.CHRONOS_HERMES:
            return 'Austism/chronos-hermes-13b'
        default:
            return model
    }
}

export async function chatLLMStream(args: {
    model: ModelName
    nsfw: boolean | undefined
    memory: string | null | undefined
    question: string
    history: Message[]
    system: string
    temperature: number
    maxTokens?: number
    assistantId?: string
    promptId?: string
    conversationId?: string
    imageModel?: ImageModel
    documentIds: string[]
    fileIds?: string[]
    onAssistantGenerateImage: OpenAIImageGeneratedFn
    streamingCallback: (token: string) => void
}): Promise<BaseMessage[]> {
    const {
        model,
        nsfw,
        memory,
        question,
        history,
        system,
        temperature,
        documentIds,
        promptId,
        maxTokens: maxTokensArg,
        streamingCallback,
        conversationId,
        fileIds,
        onAssistantGenerateImage,
        imageModel,
    } = args
    let { assistantId } = args

    // If maxTokens is undefined, it will be set to undefined
    // If maxTokens is defined and > 0, it will be set to maxTokens
    const maxTokens =
        maxTokensArg === undefined
            ? maxTokensArg
            : maxTokensArg > 0
                ? maxTokensArg
                : undefined

    const { logger } = getContext()
    const { FEATURE_AGENT } = getEnvVars()

    const baseChatOpts = {
        modelName: getModel(model),
        temperature,
        streaming: true,
        maxTokens,
        callbacks: [
            {
                handleLLMNewToken(token: string) {
                    streamingCallback(token)
                },
            },
        ],
    }

    const messages = constructMessages(question, history, system)
    const threadId = await createOrReturnThreadId(history, conversationId)
    assistantId = await checkAssistantId(promptId, assistantId)

    const chatModel = getChatModel(
        model,
        { nsfw, assistantId, threadId, fileIds, onAssistantGenerateImage },
        baseChatOpts
    )

    try {
        // NOTE: Don't implement memory or context for Pygmalion or Assistant
        if (
            !memory ||
            chatModel instanceof ChatPygmalion ||
            chatModel instanceof ChatAssistant
        ) {
            logger.debug('Calling model without memory')
            // NOTE: Don't implement document or context for Pygmalion or Assistant
            if (
                chatModel instanceof ChatPygmalion ||
                chatModel instanceof ChatAssistant ||
                documentIds.length === 0
            ) {
                if (FEATURE_AGENT === '1') {
                    const tools = [
                        generateChatTool({
                            supportDataset: false,
                            documentIds,
                            chatModel,
                            messages,
                            streamingCallback,
                        }),
                        generateImageGenerationTool({
                            streamingCallback,
                            modelName: model,
                            messages,
                            imageModel,
                        }),
                    ]
                    const executor = generateAgentExecutor(tools)
                    const callRes = await executor.stream({
                        input: messages[messages.length - 1].content,
                        chat_history: getBufferString(messages.slice(0, -1)),
                    })
                    const finalResponse: ChainValues[] = []
                    for await (const item of callRes) {
                        // console.log('Stream item:', {
                        //   ...item,
                        // })
                        if (item) {
                            finalResponse.push(item)
                        }
                    }
                    // console.log('Final response:', finalResponse)
                    return [...messages]
                } else {
                    const result = await chatModel.call(messages)
                    return [...messages, result]
                }
            } else {
                // No memory with document
                if (FEATURE_AGENT === '1') {
                    const tools = [
                        generateChatTool({
                            supportDataset: true,
                            documentIds,
                            chatModel,
                            messages,
                            streamingCallback,
                        }),
                        generateImageGenerationTool({
                            streamingCallback,
                            modelName: model,
                            messages,
                            imageModel,
                        }),
                    ]
                    const executor = generateAgentExecutor(tools)
                    const callRes = await executor.stream({
                        input: messages[messages.length - 1].content,
                        chat_history: getBufferString(messages.slice(0, -1)),
                    })
                    const finalResponse: ChainValues[] = []
                    for await (const item of callRes) {
                        // console.log('Stream item:', {
                        //   ...item,
                        // })
                        if (item) {
                            finalResponse.push(item)
                        }
                    }
                    // console.log('Final response:', finalResponse)
                    return [...messages]
                } else {
                    const retriever = await generateVectorStoreRetriever(documentIds)
                    const { OPENAI_API_KEY } = getEnvVars()

                    const chain = ConversationalRetrievalQAChain.fromLLM(
                        chatModel,
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
                        question: messages[messages.length - 1].content,
                        chat_history: messages.slice(0, -1),
                    })
                    logger.debug(callRes.sourceDocuments)
                    const result = new AIMessage(callRes.content ?? callRes.text)
                    return [...messages, result]
                }
            }
        } else {
            logger.debug(`Calling model with memory : ${memory}`)
            const res = await callModelWithChainAndMemory(
                chatModel,
                model,
                memory,
                history,
                question,
                documentIds,
                messages,
                streamingCallback,
                imageModel
            )
            return [...messages, res.message]
        }
    } catch (e) {
        throw convertChatAPIError(e)
    }
}

async function callModelWithChainAndMemory(
    llm: Exclude<FlowChatModel, ChatPygmalion | ChatAssistant>,
    model: ModelName,
    memory: string,
    history: Message[],
    question: string,
    documentIds: string[],
    messages: BaseMessage[],
    streamingCallback: (token: string) => void,
    imageModel?: ImageModel
): Promise<ChatLLMResult> {
    const { FEATURE_AGENT } = getEnvVars()
    if (FEATURE_AGENT === '1') {
        const tools = [
            generateChatTool({
                supportDataset: true,
                documentIds,
                chatModel: llm,
                memory,
                history,
                streamingCallback,
            }),
            generateImageGenerationTool({
                streamingCallback,
                modelName: model,
                messages,
                imageModel,
            }),
        ]
        const executor = generateAgentExecutor(tools)
        const callRes = await executor.stream({
            input: messages[messages.length - 1].content,
            chat_history: getBufferString(messages.slice(0, -1)),
        })
        const finalResponse: ChainValues[] = []
        for await (const item of callRes) {
            // console.log('Stream item:', {
            //   ...item,
            // })
            if (item) {
                finalResponse.push(item)
            }
        }
        // console.log('Final response:', finalResponse)
        return finalResponse[finalResponse.length - 1] as ChatLLMResult
    } else {
        const chainConfig: LLMChainInput = {
            llm,
            prompt: MODEL_TO_CHAIN_MEMORY_SYS_PROMPT,
        }
        if (documentIds.length > 0) {
            const retriever = await generateVectorStoreRetriever(documentIds)
            chainConfig.memory = new VectorStoreRetrieverMemory({
                vectorStoreRetriever: retriever,
            })
        }
        const chain = new LLMChain(chainConfig)

        // const chian_2 = generateChatChain([], llm)

        const { index: historyStartIndex, text: summary } =
            destructureMemoryEntry(memory)

        const chatHistoryFromMemory = history.slice(historyStartIndex + 1)
        const res = await chain.call({
            question_input: question,
            summary,
            chat_history: chatHistoryFromMemory,
        })

        const message = new AIMessage(res.content ?? res.text)

        return { message }
    }
}

export async function getConversationMemory(
    conversationId: string
): Promise<string | null | undefined> {
    const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        select: { memory: true },
    })

    return conversation?.memory
}

export async function updateConversationMemory(
    conversationId: string,
    memory: string
): Promise<void> {
    await prisma.conversation.update({
        where: { id: conversationId },
        data: { memory },
    })
}

export const cacheInitTokensPrefix = 'system_prompt_tokens:'
export const cacheInitPromptPrefix = 'system_prompt_prompt:'

export async function getCachedInitSystemPromptAndTokens(
    promptId: string
): Promise<{
    tokenCount: number | undefined
    initPrompt: string | undefined
}> {
    const cachedInitPromptTokens = cacheInitTokensPrefix + promptId
    const cachedInitPromptText = cacheInitPromptPrefix + promptId

    const [cachedTokenCount, cachedInitPrompt] = await Promise.all([
        redisClient.get(cachedInitPromptTokens),
        redisClient.get(cachedInitPromptText),
    ])

    const tokens = cachedTokenCount
        ? Number(z.string().optional().parse(cachedTokenCount))
        : undefined
    const initPrompt = cachedInitPrompt
        ? z.string().optional().parse(cachedInitPrompt)
        : undefined
    return { tokenCount: tokens, initPrompt }
}

export async function cacheInitSystemPromptAndTokens(
    promptId: string,
    tokens: number,
    initPrompt: string
): Promise<void> {
    const cacheKeyTokens = cacheInitTokensPrefix + promptId
    const cacheKeyPrompt = cacheInitPromptPrefix + promptId

    await Promise.all([
        redisClient.set(cacheKeyTokens, tokens, 'EX', 60 * 60 * 24 * 7 * 2), // cache for 2 weeks
        redisClient.set(cacheKeyPrompt, initPrompt, 'EX', 60 * 60 * 24 * 7 * 2),
    ])
}

export async function getInitPromptAndTokens(
    model: ModelName,
    promptId: string
): Promise<{
    tokenCount: number
    initPrompt: string
}> {
    const { tokenCount: cachedTokenCount, initPrompt: cachedInitPrompt } =
        await getCachedInitSystemPromptAndTokens(promptId)

    if (cachedTokenCount && cachedInitPrompt) {
        return { tokenCount: cachedTokenCount, initPrompt: cachedInitPrompt }
    }

    const promptRes = await prisma.prompt.findUnique({
        where: { id: promptId },
        select: { initPrompt: true },
    })
    const initPrompt = promptRes?.initPrompt

    if (initPrompt === undefined) {
        throw new Error(`initPrompt with id ${promptId} not found`)
    }

    const tokenCount = await getTokenCountFromMessages(model, [
        new SystemMessage({
            content: initPrompt,
        }),
    ])

    await cacheInitSystemPromptAndTokens(promptId, tokenCount, initPrompt)

    return {
        tokenCount,
        initPrompt,
    }
}

export async function getNumTokensFromInputParallel(
    model: ModelName,
    question: string,
    history: Message[],
    system?: string
): Promise<number[]> {
    const messages = constructMessages(question, history, system)
    const result = await timedPromise(
        getNumTokensArrayFromMessages(model, messages),
        getNumTokensArrayFromMessages.name
    )
    return result
}

export async function getTokenCountFromMessages(
    model: ModelName,
    messages: BaseMessage[],
    options?: {
        followedByAIReply?: boolean
    }
): Promise<number> {
    const tokenCountPerMessage = await getNumTokensArrayFromMessages(
        model,
        messages
    )
    return getTotalTokensFromTokenCountPerMessage(tokenCountPerMessage, options)
}

/**
 * Tokenize and count the messages in parallel; we do this because it's 10x faster than applying the LangchainJS's
 * tokenizer to the entire message list at once
 * @param model model name
 * @param messages messages
 * @returns number of tokens in each message
 */
export async function getNumTokensArrayFromMessages(
    model: ModelName,
    messages: BaseMessage[]
): Promise<number[]> {
    // find the ones that are not cached
    // the originalIndex is used to map the number of token back to the message in the original
    // position so that when we return the token list, it's in the same order as the original messages
    const tokenListMessageAndOriginalIndex = (await Promise.all(
        messages.map(async (message, originalIndex) => {
            const cachedNumTokens = await getCachedNumTokensOrNone(
                convertMessageContentToString(message.content)
            )
            return { message, originalIndex, token: cachedNumTokens }
        })
    )) as Array<{
        message: BaseMessage
        originalIndex: number
        token: number | null
    }>
    const uncachedMessagesAndOriginalIndex =
        tokenListMessageAndOriginalIndex.filter((el) => el.token === null)
    const uncachedMessages = uncachedMessagesAndOriginalIndex.map(
        (el) => el.message
    )
    let countPerUncachedMessageList: number[] = []
    // TODO: handle this for other models
    switch (model) {
        case ModelName.GPT_3_5_TURBO:
        case ModelName.GPT_4:
        case ModelName.GPT_4_TURBO:
        case ModelName.GPT_3_5_LONG:
            countPerUncachedMessageList = (
                await customOpenAIGetNumTokensFromMessages(model, uncachedMessages)
            ).countPerMessage
            break
        case ModelName.CLAUDE_V1:
        case ModelName.CLAUDE_INSTANT:
        case ModelName.CLAUDE_V2:
            countPerUncachedMessageList = await getAnthropicTokenListFromMessages(
                uncachedMessages
            )
            break
        default:
            countPerUncachedMessageList = (
                await customOpenAIGetNumTokensFromMessages(model, uncachedMessages)
            ).countPerMessage
            break
    }

    // map calculated tokens back to the uncached messages' positions in the original list
    // also cache them
    await Promise.all(
        uncachedMessagesAndOriginalIndex.map(
            async ({ message, originalIndex, token }, i) => {
                if (token === null) {
                    const calculatedToken = countPerUncachedMessageList[i]
                    tokenListMessageAndOriginalIndex[originalIndex].token =
                        calculatedToken
                    await setCachedNumTokens(
                        convertMessageContentToString(message.content),
                        calculatedToken
                    )
                }
            }
        )
    )

    // if any chance we get incomplete list from the tokenizer, then just fill 0s to be safe.
    // ideally this should never happen, and we should log errors on the backend if it does
    const resList = tokenListMessageAndOriginalIndex.map((el) => el.token ?? 0)
    return resList
}

export const promptMessageNumTokensPrefix = 'promptMessageNumTokens:'

async function getCachedNumTokensOrNone(
    message: string
): Promise<number | null> {
    const hash = hashString(message)
    const key = promptMessageNumTokensPrefix + hash
    // check for the message's token count in our Redis cache via key as message hash
    // if it's there i.e no new messages, return it
    // time the redis ops as well -- suspect that Upstash might be slow
    const res = await redisClient.get(key)
    if (res && !isNaN(Number(res))) {
        return Number(res)
    }
    return null
}

async function setCachedNumTokens(message: string, numTokens: number) {
    const hash = hashString(message)
    const key = promptMessageNumTokensPrefix + hash
    await redisClient.set(key, numTokens.toString(), 'EX', 60 * 60 * 24 * 7 * 2) // cache for 2 weeks
}

export async function getNewMsgToSummarize(
    existingMemory: string | null | undefined,
    history: BaseMessage[],
    targetHistoryBufferLimitToken: number
): Promise<{
    newMemoryIndex: number
    newMessageToSummarize: BaseMessage[]
}> {
    // default to cold start setup means no existingMemory provided
    let existingMemoryIndex = 0
    let restHistory = history
    if (existingMemory) {
        const { index } = destructureMemoryEntry(existingMemory)
        existingMemoryIndex = index
        restHistory = history.slice(existingMemoryIndex) // get the rest of the history
    }

    const cpm = await getNumTokensArrayFromMessages(
        ModelName.GPT_3_5_TURBO,
        restHistory
    )
    // no AI reply here because this getNewMsgToSummarize is called after the AI reply
    const totalTokens = getTotalTokensFromTokenCountPerMessage(cpm)
    const baseMessageCumSum = cumulativeSum(cpm)

    const findIndex = baseMessageCumSum.findIndex(
        (tokenCount) => totalTokens - tokenCount < targetHistoryBufferLimitToken
    )
    const memoryIndex = findIndex === -1 ? 0 : findIndex

    return {
        newMemoryIndex: memoryIndex,
        newMessageToSummarize: restHistory.slice(0, memoryIndex),
    }
}

export const generateImagePollinations = async (args: PollinationsOptions) => {
    const { words, width, height } = args
    const url = `https://image.pollinations.ai/prompt/${words}?width=${width}&height=${height}&nologo=true`
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Failed to download image: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const imageData = Buffer.from(arrayBuffer)

    return await uploadImageToS3(imageData, args)
}

export async function generateImageLepton(args: LeptonImageGenerationOptions) {
    const { LEPTON_API_KEY } = getEnvVars()

    const headers = {
        Authorization: `Bearer ${LEPTON_API_KEY}`,
        'Content-Type': 'application/json',
    }

    const imageResponse = await fetch(
        'https://k9knkoi0-sdfarm.bjz.edr.lepton.ai/txt2img',
        {
            method: 'POST',
            headers,
            body: JSON.stringify(args),
        }
    )

    if (!imageResponse.ok || !imageResponse.body) {
        throw new Error(`HTTP error! Status: ${imageResponse.status}`)
    }

    const arrayBuffer = await imageResponse.arrayBuffer()
    const imageData = Buffer.from(arrayBuffer)

    return await uploadImageToS3(imageData, args)
}

export async function generateImageDalle(args: ImageGenerateParams) {
    const { OPENAI_API_KEYS: openAIKeys } = getEnvVars()
    const openai = new OpenAI({
        apiKey: openAIKeys,
    })
    const response = await openai.images.generate(args)

    const ImageResponseSchema = z.object({
        data: z
            .array(
                z.object({
                    b64_json: z.string(),
                })
            )
            .refine((data) => data.length > 0),
    })

    const parsedResponse = ImageResponseSchema.parse(response)

    const base64Json = parsedResponse.data[0].b64_json

    const imageData = Buffer.from(base64Json, 'base64')

    return await uploadImageToS3(imageData, args)
}

export async function createAssistant(
    name: string,
    instructions: string,
    tools: Array<
        Assistant.CodeInterpreter | Assistant.Retrieval | Assistant.Function
    >,
    fileIds: string[],
    model: string
): Promise<string> {
    const { OPENAI_ASSISTANT_API_KEY: openAIKey } = getEnvVars()
    const openai = new OpenAI({
        apiKey: openAIKey,
    })
    const assistant = await openai.beta.assistants.create({
        name,
        instructions,
        tools,
        model,
        file_ids: fileIds,
    })
    return assistant.id
}

export async function updateAssistant(
    id: string,
    name: string | undefined,
    instructions: string | undefined,
    tools:
        | Array<
            Assistant.CodeInterpreter | Assistant.Retrieval | Assistant.Function
        >
        | undefined,
    fileIds: string[] | undefined,
    model: string | undefined
): Promise<string> {
    const { OPENAI_ASSISTANT_API_KEY: openAIKey } = getEnvVars()
    const openai = new OpenAI({
        apiKey: openAIKey,
    })
    const assistant = await openai.beta.assistants.update(id, {
        name,
        instructions,
        tools,
        model,
        file_ids: fileIds,
    })
    return assistant.id
}

export async function checkAssistantId(
    promptId?: string,
    existAssistantId?: string
): Promise<string | undefined> {
    let cachedAssistantId: string | null
    if (existAssistantId === undefined && promptId) {
        const cacheKey = `assistantId:${promptId ?? ''}`
        cachedAssistantId = await redisClient.get(cacheKey)
        if (cachedAssistantId) {
            return cachedAssistantId
        }
        const promptAssistantId = await prisma.prompt.findUnique({
            where: {
                id: promptId,
            },
            select: {
                PromptOption: {
                    select: {
                        assistantId: true,
                    },
                },
            },
        })
        if (promptAssistantId) {
            if (promptAssistantId?.PromptOption?.assistantId) {
                await redisClient.set(
                    cacheKey,
                    promptAssistantId?.PromptOption?.assistantId,
                    'EX',
                    60 * 60 * 24
                ) // cache for 1 day
            }

            return promptAssistantId?.PromptOption?.assistantId ?? undefined
        }
    } else {
        return existAssistantId
    }
}

export async function createOrReturnThreadId(
    history: Message[],
    conversationId?: string
): Promise<string> {
    const openai = new OpenAI({
        apiKey: getEnvVars().OPENAI_ASSISTANT_API_KEY,
    })
    let threadId: string | null
    const cacheKey = `threadId:${conversationId ?? ''}`
    threadId = await redisClient.get(cacheKey)
    if (threadId) {
        return threadId
    }

    if (conversationId) {
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            select: {
                threadId: true,
            },
        })

        if (conversation?.threadId) {
            threadId = conversation?.threadId
        } else {
            const messages = await reconstructAssistantThreadMessagesFromHistory(
                history
            )
            const thread = await openai.beta.threads.create({
                messages,
            })
            threadId = thread.id
        }
    } else {
        const messages = await reconstructAssistantThreadMessagesFromHistory(
            history
        )
        const thread = await openai.beta.threads.create({
            messages,
        })
        threadId = thread.id
    }
    if (!threadId) {
        throw new Error('Failed to create thread')
    }

    await redisClient.set(cacheKey, threadId, 'EX', 60 * 60 * 24) // cache for 1 day

    return threadId
}

async function reconstructAssistantThreadMessagesFromHistory(
    history: Message[]
): Promise<OpenAI.Beta.Threads.ThreadCreateParams.Message[]> {
    const historicChatDocumentIds = history
        .filter((el) => el.files !== undefined)
        .reduce<Array<ChatDocument['id']>>((prev, curr) => {
            return [
                ...prev,
                ...(curr.files?.map((file) => file.chatFileDocumentId) ?? []),
            ]
        }, [])
    const chatDocAndOpenAIFileIds = await getOpenAIFileIdsFromChatDocumentIds(
        historicChatDocumentIds
    )
    // create ChatDocument -> openAI file ID map
    const chatDocIdToOpenAIFileIdMap = chatDocAndOpenAIFileIds.reduce<
        Record<ChatDocument['id'], string>
    >((prev, curr) => {
        return { ...prev, [curr.chatDocumentId]: curr.openAIFileId }
    }, {})
    const messages: OpenAI.Beta.Threads.ThreadCreateParams.Message[] =
        history.map((item) => ({
            role: 'user', // only support user now
            content: item.content,
            file_ids: item.files
                ?.map(
                    ({ chatFileDocumentId }) =>
                        chatDocIdToOpenAIFileIdMap[chatFileDocumentId]
                )
                .filter((el) => el !== undefined),
        }))
    return messages
}

type TOpenAIFileId = string

/**
 * Upload the file (in Buffer) to OpenAI (for purposes like Assistant API or any other retrieval tool from them)
 */
export async function uploadFileBufferToOpenAIFS(args: {
    fileBuffer: Buffer
    fileContentType: string
}): Promise<{ id: TOpenAIFileId }> {
    // create a temp file stream to be compat with the SDK
    // remove it right after
    const openai = new OpenAI({
        apiKey: getEnvVars().OPENAI_ASSISTANT_API_KEY,
    })

    let fileExtension: string | false | undefined = mime.extension(
        args.fileContentType
    )
    if (fileExtension === false) {
        fileExtension = undefined
    }
    const tempFilePath = generateTempFilePath(fileExtension)
    fs.writeFileSync(tempFilePath, args.fileBuffer)
    const tempFileStream = fs.createReadStream(tempFilePath)

    const createdOpenAIFile = await openai.files.create({
        file: tempFileStream,
        purpose: 'assistants',
    })

    // delete file to free server disk space
    fs.unlinkSync(tempFilePath)

    return {
        id: createdOpenAIFile.id,
    }
}

/**
 * upload our chat blob to our file storage so that we can
 * recreate later; default right now we use S3 as the underlying FS infra
 **/
export async function uploadFileBufferToFlowFS(args: {
    key: string
    fileBuffer: Buffer
    fileContentType: string
}): Promise<void> {
    await s3Client.send(
        await constructPutCommand({
            bucket: FLOW_CHAT_IMAGES_BUCKETNAME,
            contentType: args.fileContentType,
            fileBuf: args.fileBuffer,
            key: args.key,
        })
    )
}

/**
 * link the file storage key -> our Document entities in our DB
 **/
export async function createDBChatFilePointers(args: {
    flowFSKey: string
    openAIFileId: TOpenAIFileId
    userId: User['id']
    conversationId?: Conversation['id']
    document: {
        name: Document['id']
    }
}): Promise<{ chatDocumentId: ChatDocument['id'] }> {
    // create UNUSED chat docs
    const chatDocument = await prisma.chatDocument.create({
        select: {
            id: true,
        },
        data: {
            status: 'UNUSED',
            Conversation: {
                connect: {
                    id: args.conversationId,
                },
            },
            Document: {
                create: {
                    name: args.document.name,
                    s3Key: args.flowFSKey,
                    assistantFileId: args.openAIFileId,
                    status: DocumentStatus.PROCESSED, // by default it's processed because we uploaded it before this function
                    User: {
                        connect: {
                            id: args.userId,
                        },
                    },
                },
            },
        },
    })
    return {
        chatDocumentId: chatDocument.id,
    }
}

/**
 * Mark the ChatDocument pointers as USED i.e uploaded and used by LLM prompt
 */
export async function markChatDocumentsUsed(
    ids: Array<ChatDocument['id']>
): Promise<void> {
    // set any files used in the Assistant as used
    await prisma.chatDocument.updateMany({
        where: {
            id: {
                in: ids,
            },
        },
        data: {
            status: 'USED',
        },
    })
}

export async function generateFlowFSPresignedURL(args: {
    key: string
    responseContentType: string
}): Promise<string> {
    return await generatePresignedUrl({
        key: args.key,
        bucket: FLOW_CHAT_IMAGES_BUCKETNAME,
        responseContentType: args.responseContentType,
    })
}

export async function getOpenAIFileIdsFromChatDocumentIds(
    chatDocumentIds: Array<ChatDocument['id']>
): Promise<
    Array<{ openAIFileId: string; chatDocumentId: ChatDocument['id'] }>
> {
    const results = await prisma.chatDocument.findMany({
        where: {
            id: {
                in: chatDocumentIds,
            },
        },
        select: {
            Document: {
                select: {
                    assistantFileId: true,
                },
            },
            id: true,
        },
    })
    return results
        .map((el) => ({
            chatDocumentId: el.id,
            openAIFileId: el.Document.assistantFileId,
        }))
        .filter((el) => el !== null) as Array<{
            openAIFileId: string
            chatDocumentId: ChatDocument['id']
        }>
}

export async function getPromptById({
    id,
    select,
}: {
    id: Prompt['id']
    select: Prisma.PromptSelect
}) {
    const found = await prisma.prompt.findFirst({
        where: {
            id,
        },
        select,
    })
    return found
}

export async function updatePromptAssistantId({
    id,
    assistantId,
}: {
    id: Prompt['id']
    assistantId: PromptOption['assistantId']
}) {
    await prisma.prompt.update({
        where: {
            id,
        },
        data: {
            PromptOption: {
                update: {
                    assistantId,
                },
            },
        },
    })
}

// Changes beautify text from illegally to legal
export async function beautifyText(text: string) {
    const { LEPTON_API_KEY } = getEnvVars()

    const openai = new OpenAI({
        apiKey: LEPTON_API_KEY,
        baseURL: 'https://mixtral-8x7b.lepton.run/api/v1/',
    })

    const prompt = `"${text}" this sentence is illegal and moderated. Please change it to a legal version, remove any illegal or sensitive descriptions or words, be strict about this. This text will go into an image generation prompt, so remove anything that might cause issues. Please put the new sentence in quotations.`

    const result = await openai.completions.create({
        model: '',
        prompt,
        temperature: 0.1,
        max_tokens: 60,
        stream: false,
    })

    const resultText = result.choices[0].text
    // parse text in quotation without quotation

    const regex = /"([^"]*)"/g

    return resultText.match(regex)?.[0].replace(/"/g, '') ?? resultText
}
