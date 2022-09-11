export type FundDataItem = {
  NAME: string;
  CODE: string;
  CATEGORY: number;
  FundBaseInfo: {
    DWJZ: number;
  };
};

export const suggestFunds = (key: string): Promise<FundDataItem[]> => {
  if (!key) {
    return Promise.resolve([]);
  }
};
