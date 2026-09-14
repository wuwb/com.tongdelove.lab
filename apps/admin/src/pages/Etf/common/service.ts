import { fetchJsonp } from './jsonp'

export type FundDataItem = {
  NAME: string
  CODE: string
  CATEGORY: number
  FundBaseInfo: {
    DWJZ: number
  }
}

type SuggestResponse = {
  Datas?: Array<FundDataItem>
}

/**
 * 基金搜索建议，数据来源：天天基金网。
 */
export const suggestFunds = (key: string): Promise<FundDataItem[]> => {
  if (!key) {
    return Promise.resolve([])
  }

  return fetchJsonp<SuggestResponse>(
    `https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx?m=1&Key=${key}&_=${Date.now()}`,
  )
    .then((json) => {
      const data: Array<FundDataItem> = json?.Datas || []
      // CATEGORY 为 700 时是场内基金（ETF、LOF 等）
      return data.filter((item) => item.CATEGORY === 700)
    })
    .catch((e) => {
      console.error('[suggestFunds]', e)
      return []
    })
}
