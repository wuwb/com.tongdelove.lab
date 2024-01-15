export const THOUSAND_TOKENS = 1000

// USD per token
export enum TokenDollarConvRate {
    GPT_4_PROMPT = 0.03 / THOUSAND_TOKENS, // $0.03 / 1K tokens
    GPT_4_COMPLETION = 0.06 / THOUSAND_TOKENS, // $0.06 / 1K tokens
    GPT_4_TURBO_PROMPT = 0.01 / THOUSAND_TOKENS, // $0.01 / 1K tokens
    GPT_4_TURBO_COMPLETION = 0.03 / THOUSAND_TOKENS, // $0.03 / 1K tokens
    GPT_3_5_TURBO = 0.002 / THOUSAND_TOKENS, // $0.002 / 1K tokens
    GPT_3_5_LONG = 0.002 / THOUSAND_TOKENS, // $0.002 / 1K tokens
    CLAUDE_V1 = 0.011 / THOUSAND_TOKENS, // $0.01102 / 1K tokens
    CLAUDE_INSTANT = 0.0008 / THOUSAND_TOKENS, // $0.0008 / 1K tokens https://www-files.anthropic.com/production/images/model_pricing_dec2023.pdf
    CLAUDE_V2 = 0.008 / THOUSAND_TOKENS, // $0.008 / 1K tokens
    LLAMA2 = 0 / THOUSAND_TOKENS, // Free for now
    PYG_13B = 0 / THOUSAND_TOKENS, // Free for now
    GOOGLE_PALM_2 = 0 / THOUSAND_TOKENS, // Free for now
    CHRONOS_HERMES = 0 / THOUSAND_TOKENS, // Free for now
    GOOGLE_GEMINI = 0 / THOUSAND_TOKENS, // Free for now
}

export const TOKEN_LIMIT = 130000

export const ESTIMATED_RESPONSE_TOKEN = 200

export enum ModelName {
    GPT_4 = 'gpt-4',
    GPT_4_TURBO = 'gpt-4-turbo',
    GPT_3_5_TURBO = 'gpt-3.5-turbo',
    GPT_3_5_LONG = 'gpt-3.5-long',
    CLAUDE_V1 = 'claude-v1',
    CLAUDE_INSTANT = 'claude-instant',
    CLAUDE_V2 = 'claude-v2',
    LLAMA2_13B = 'llama2-13b',
    GOOGLE_PALM_2 = 'google-palm-2',
    GOOGLE_GEMINI = 'google-gemini',
    PYG_13B = 'pygmalion-13b',
    GPT_3_5_TURBO_16K = 'gpt-3.5-turbo-16k',
    MYTHALION_13B = 'mythalion-13b',
    CHRONOS_HERMES = 'chronos-hermes-13b',
}

export enum ErrorType {
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
    INVALID_CHAT_MODEL = 'Invalid chat model',
    INSUFFICIENT_CREDIT = 'Insufficient credit',
    UNSUPPORTED_MEDIA_TYPE = 'Unsupported media type',
    NO_PERMISSIONS = 'No permissions to access this resource',
    MODEL_WORKER_NOT_FOUND = 'Model worker not found',
    CONTEXT_LENGTH_ERROR = 'Context length error',
    RATE_LIMITED = 'Too many requests, rate limited',
    NOT_IMPLEMENTED = 'Not implemented',
    NO_FILE_UPLOADED = 'No file uploaded',
    S3_REQUEST_FAILED = 'S3 request failed',
    QDRANT_REQUEST_FAILED = 'RDrant request failed',
    OPENAI_MODERATION_FAILED = 'OpenAI moderation failed',
}

export enum ModelApiErrorMessages {
    CONTEXT_LENGTH_ERROR = 'context_length_exceeded',
    OVERLOADED_ERROR = 'That model is currently overloaded with other requests',
    RATE_LIMITED_ERROR = 'Rate limit',
}

export enum ModelMarkup {
    GPT_4 = 2,
    GPT_4_TURBO = 4 / 5,
    GPT_3_5_TURBO = 0, // TODO: Free for now
    GPT_3_5_LONG = 2,
    PYG_13B = 0, // TODO: Free for now
    CLAUDE_V1 = 2,
    CLAUDE_INSTANT = 5,
    CLAUDE_V2 = 3,
    LLAMA2 = 0,
    GOOGLE_PALM_2 = 0,
    CHRONOS_HERMES = 0,
    GOOGLE_GEMINI = 0,
}

export const FREE_MODELS = [
    ModelName.LLAMA2_13B,
    ModelName.GPT_3_5_TURBO,
    ModelName.GPT_3_5_TURBO_16K,
    ModelName.PYG_13B,
    ModelName.GOOGLE_PALM_2,
    ModelName.GOOGLE_GEMINI,
    ModelName.MYTHALION_13B,
    ModelName.CHRONOS_HERMES,
]

export const OPENAI_MODELS = [
    ModelName.GPT_4,
    ModelName.GPT_4_TURBO,
    ModelName.GPT_3_5_TURBO,
    ModelName.GPT_3_5_TURBO_16K,
    ModelName.GPT_3_5_LONG,
]

export const ASSISTANT_API_COMPAT_MODELS = [
    ModelName.GPT_4,
    ModelName.GPT_4_TURBO,
]
