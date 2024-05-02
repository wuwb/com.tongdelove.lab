export type FundDataItem = {
  NAME: string
  CODE: string
  CATEGORY: number
  FundBaseInfo: {
    DWJZ: number
  }
}

export const suggestFunds = (key: string) => {
  if (!key) {
    return Promise.resolve([] as FundDataItem[])
  } else {
    // TODO: implement suggest funds logic
    return Promise.resolve([] as FundDataItem[])
  }
}
