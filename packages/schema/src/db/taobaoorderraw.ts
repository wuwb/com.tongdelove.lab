import * as z from "zod"
import { Decimal } from "decimal.js"

// Helper schema for Decimal fields
z
  .instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value)
    } catch (error) {
      return false
    }
  })
  .transform((value) => new Decimal(value))

export const TaobaoOrderRawModelSchema = z.object({
  id: z.string(),
  buyerName: z.string(),
  buyerNick: z.string(),
  payId: z.string(),
  payDetail: z.string(),
  tradePayable: z.number(),
  postage: z.number(),
  integration: z.number().int(),
  total: z.number(),
  rebateIntegration: z.number().int(),
  realTotal: z.number(),
  realIntegration: z.number().int(),
  status: z.string(),
  message: z.string(),
  receiver: z.string(),
  address: z.string(),
  deliveryMode: z.string(),
  telephone: z.string(),
  cellphone: z.string(),
  virtualNumberExpirationAt: z.date(),
  orderCreatedAt: z.date(),
  payAt: z.date(),
  goodsTitle: z.string(),
  goodsType: z.number().int(),
  deliveryOrder: z.string(),
  deliveryCompany: z.string(),
  orderNote: z.string(),
  goodsCount: z.number().int(),
  shopId: z.string(),
  shopName: z.string(),
  closedReason: z.string(),
  sellerSerivce: z.number().int(),
  buyerService: z.number().int(),
  invoiceTitle: z.string(),
  isCellphoneOrder: z.string(),
  stagingOrderInfo: z.string(),
  privilegeDownPaymentOderId: z.number().int(),
  isUploadContractPicture: z.number().int(),
  isUploadInvoicePicture: z.number().int(),
  isPayForAnother: z.number().int(),
  downPaymentRank: z.number().int(),
  modifiedSku: z.string(),
  modifiedAddress: z.string(),
  exceptionMessage: z.string(),
  tmallCouponDeduction: z.number().int(),
  integrationDeduction: z.number().int(),
  isO2OOrder: z.number().int(),
  newRetailTradeType: z.string(),
  newRetailGuideShopName: z.string(),
  newRetailGuideShopId: z.string(),
  newRetailDeliverShopName: z.string(),
  newRetailDeliverShopId: z.string(),
  refundAmount: z.number(),
  appointmentShop: z.string(),
  confirmReceiptAt: z.date(),
  remitNum: z.number(),
  personalRedEnvelope: z.string(),
  isCreditBuy: z.number().int(),
  experienceEndAt: z.date(),
  topNGift: z.string(),
  deliveryType: z.string(),
  liveCashbackStatus: z.string(),
  cashbackAmount: z.number().int(),
  slowDeliveryCompensate: z.number().int(),
  newRetailDealShopName: z.string(),
  newRetailDealShopId: z.string(),
  newRetailDealDealerId: z.string(),
  isPresell: z.number().int(),
  deliveryAt: z.date(),
  comment: z.string(),
  masterOrderId: z.string(),
})
