import { formatLogToString } from 'langchain/agents/format_scratchpad/log'
import { PromptTemplate } from 'langchain/prompts'
import {
    AgentAction,
    AgentFinish,
    AgentStep,
    BaseMessage,
    HumanMessage,
    InputValues,
} from 'langchain/schema'
import { DynamicTool, Tool } from 'langchain/tools'
import { OpenAI } from 'langchain/llms/openai'
import { RunnableSequence } from 'langchain/schema/runnable'
import { AgentExecutor } from 'langchain/agents'
import { ModelName } from './constant'

/** Create the prefix prompt */
const PREFIX = `
Assistant is a large language model trained by OpenAI.

Assistant is designed to be able to assist with a wide range of tasks, from answering simple questions to providing in-depth explanations and discussions on a wide range of topics. As a language model, Assistant is able to generate human-like text based on the input it receives, allowing it to engage in natural-sounding conversations and provide responses that are coherent and relevant to the topic at hand.

Assistant is constantly learning and improving, and its capabilities are constantly evolving. It is able to process and understand large amounts of text, and can use this knowledge to provide accurate and informative responses to a wide range of questions. Additionally, Assistant is able to generate its own text based on the input it receives, allowing it to engage in discussions and provide explanations and descriptions on a wide range of topics.

Overall, Assistant is a powerful tool that can help with a wide range of tasks and provide valuable insights and information on a wide range of topics. Whether you need help with a specific question or just want to have a conversation about a particular topic, Assistant is here to assist.

------

Assistant has access to the following tools:

{tools}`

/** Create the tool instructions prompt */
const TOOL_INSTRUCTIONS_TEMPLATE = `Use the following format in your response:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question`

/** Create the suffix prompt */
const SUFFIX = `Begin!

Previous conversation history:
{chat_history}

Question: {input}
Thought:`

export const generateFormatMessages = (tools: Tool[]) => {
    return async function formatMessages(
        values: InputValues
    ): Promise<BaseMessage[]> {
        /** Check input and intermediate steps are both inside values */
        if (!('input' in values) || !('intermediate_steps' in values)) {
            throw new Error('Missing input or agent_scratchpad from values.')
        }
        /** Extract and case the intermediateSteps from values as Array<AgentStep> or an empty array if none are passed */
        const intermediateSteps = values.intermediate_steps
            ? (values.intermediate_steps as AgentStep[])
            : []
        /** Call the helper `formatLogToString` which returns the steps as a string  */
        const agentScratchpad = formatLogToString(intermediateSteps)
        /** Construct the tool strings */
        const toolStrings = tools
            .map((tool) => `${tool.name}: ${tool.description}`)
            .join('\n')
        const toolNames = tools.map((tool) => tool.name).join(',\n')
        /** Create templates and format the instructions and suffix prompts */
        const prefixTemplate = new PromptTemplate({
            template: PREFIX,
            inputVariables: ['tools'],
        })
        const instructionsTemplate = new PromptTemplate({
            template: TOOL_INSTRUCTIONS_TEMPLATE,
            inputVariables: ['tool_names'],
        })
        const suffixTemplate = new PromptTemplate({
            template: SUFFIX,
            inputVariables: ['input', 'chat_history'],
        })
        /** Format both templates by passing in the input variables */
        const formattedPrefix = await prefixTemplate.format({
            tools: toolStrings,
        })
        const formattedInstructions = await instructionsTemplate.format({
            tool_names: toolNames,
        })
        const formattedSuffix = await suffixTemplate.format({
            input: values.input,
            chat_history: values.chat_history,
        })
        /** Construct the final prompt string */
        const formatted = [
            formattedPrefix,
            formattedInstructions,
            formattedSuffix,
            agentScratchpad,
        ].join('\n')
        /** Return the message as a HumanMessage. */
        return [new HumanMessage(formatted)]
    }
}

/** Define the custom output parser */
export function customOutputParser(text: string): AgentAction | AgentFinish {
    /** If the input includes "Final Answer" return as an instance of `AgentFinish` */
    if (text.includes('Final Answer:')) {
        const parts = text.split('Final Answer:')
        const input = parts[parts.length - 1].trim()
        const finalAnswers = { output: input }
        return { log: text, returnValues: finalAnswers }
    }
    // console.log(text)
    /** Use regex to extract any actions and their values */
    const match = /Action: (.*)\nAction Input: (.*)/s.exec(text)
    if (!match) {
        throw new Error(`Could not parse LLM output: ${text}`)
    }
    // console.log('action')
    // console.log(match[1].trim())
    // console.log(match[2].trim().replace(/^"+|"+$/g, ''))
    /** Return as an instance of `AgentAction` */
    return {
        tool: match[1].trim(),
        toolInput: text,
        log: text,
    }
}

export const generateAgentExecutorLLM = () => {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY

    return new OpenAI({
        temperature: 0,
        openAIApiKey: OPENAI_API_KEY,
        modelName: ModelName.GPT_4,
    }).bind({
        stop: ['\nObservation'],
    })
}

export const generateAgentExecutor = (tools: DynamicTool[]) => {
    const theModel = generateAgentExecutorLLM()
    const formatMessages = generateFormatMessages(tools)
    const runnable = RunnableSequence.from([
        {
            input: (values: InputValues) => values.input,
            intermediate_steps: (values: InputValues) => values.steps,
            chat_history: (values: InputValues) => values.chat_history,
        },
        formatMessages,
        theModel,
        customOutputParser,
    ])
    const executor = new AgentExecutor({
        agent: runnable,
        tools,
        maxIterations: 5,
    })
    return executor
}
