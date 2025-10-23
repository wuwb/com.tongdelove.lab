
type MallInfo = {
  mallId: number;
  mallName: string;
  managedType: number;
  uniqueId: string;
}

export type UserInfo = {
  accountId: number;
  maskMobile: any | null;
  mallList: MallInfo[];
  accountType: number; // 2
}
