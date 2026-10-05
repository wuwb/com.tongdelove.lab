import axios from 'axios'

let token: { access_token: string; expires_in: number; time: number } | null =
  null

const getBaiduToken = async () => {
  if (token && token.time + token.expires_in * 1000 > Date.now()) {
    return token
  }

  const res = await axios.post(
    `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${process.env.BAIDU_YIYAN_API_KEY}&client_secret=${process.env.BAIDU_YIYAN_SECRET_KEY}`,
  )

  token = {
    access_token: res.data.access_token,
    expires_in: res.data.expires_in,
    time: Date.now(),
  }

  return token
}

/**
 * 文心一言生成诗词白话文翻译（迁移自 apps/lab 的 poem router）。
 */
export const getPoemTranslation = async (content: string) => {
  const _token = await getBaiduToken()

  const res = await axios.post(
    `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-3.5-8k-preview?access_token=${_token.access_token}`,
    {
      messages: [
        {
          role: 'user',
          content:
            '你只需要将我发送的诗词内容进行白话文翻译，不需要赏析，不需要任何多余内容，只需要白话文翻译。不需要加上描述性文字“希望能符合我的要求”类似的结束语。不需要“以下是 xxx “的开始语， 确认请回复“确认”',
        },
        {
          role: 'assistant',
          content:
            '确认。请提供您需要翻译的诗词内容，我会直接将其翻译成白话文。',
        },
        {
          role: 'user',
          content,
        },
      ],
    },
  )

  return res.data.result as string
}

/**
 * 拉取 Unsplash 随机图片（迁移自 apps/lab 的 third/unsplash）。
 * 未配置 UNSPLASH_ACCESS_KEY 时返回 undefined，与原行为一致。
 */
export const getRandomImages = async (count = 30) => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  if (!accessKey) return undefined

  const res = await axios.get('https://api.unsplash.com/photos/random', {
    params: { count, client_id: accessKey },
  })

  const items: Array<{ urls: { regular: string } }> = Array.isArray(res.data)
    ? res.data
    : [res.data]

  return items.map((item) => item.urls.regular)
}
