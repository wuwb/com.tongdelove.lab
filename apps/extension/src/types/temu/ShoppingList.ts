export interface AddressInfo {
  provinceName: string
  provinceCode: number
  cityName: string
  cityCode: number
  districtName: string
  districtCode: number
  receiverName: string
  detailAddress: string
  phone: string
}

export interface DeliveryAddressInfo extends AddressInfo {
  id: number
  addressLabel: string
  townName?: string
  townCode?: number
  addressDetail: string
  isDefault: boolean
  warehouseType: number
}

export interface SubPurchaseOrderBasicVO {
  subPurchaseOrderSn: string
  productSkcId: number
  productSkcPicture: string
  purchaseStockType: number
  settlementType: number
  isFirst: boolean
  supplierId: number
  purchaseTime: number
  purchaseQuantity: number
  skcExtCode: string
  isClothCategory: boolean | null
  isTargetCategory: boolean | null
  urgencyType: number
  isCustomProduct: boolean
  productName: string
  subWarehouseId: number | null
  subWarehouseName: string | null
  receiveAddressInfo: AddressInfo | null
  fragileTag: boolean
  productInventoryRegion: number
  autoRemoveFromDeliveryPlatformTime: number | null
  expectLatestDeliverTimeOrDefault: number | null
  expectLatestArrivalTimeOrDefault: number | null
  deliverUpcomingDelayTimeMillis: number
  arrivalUpcomingDelayTimeMillis: number
  deliverDisplayCountdownMillis: number
  arrivalDisplayCountdownMillis: number
  lackOrSoldOutTagList: any[] | null
}

export interface PackageItem {
  packageSn: string
  skcNum: number
}

export interface PackageDetailItem {
  productSkuId: number
  productOriginalSkuId: number | null
  personalText: string | null
  skuNum: number
  specClassName: string | null
}

export interface DeliveryOrderItem {
  subWarehouseId: number
  subWarehouseName: string
  supplierId: number
  deliveryOrderSn: string
  deliveryMethod: number
  deliveryAddressId: number
  predictTotalPackageWeight: number
  subPurchaseOrderSn: string
  subPurchaseOrderBasicVO: SubPurchaseOrderBasicVO
  expressDeliverySn: string
  expressCompanyId: number
  tmsChannelId: number
  expressCompany: string
  expressPackageNum: number
  otherDeliveryPackageNum: number
  purchaseTime: number
  status: number
  productSkcId: number
  skcExtCode: string
  skcPurchaseNum: number
  deliverSkcNum: number
  receiveSkcNum: number
  defectiveSkcNum: number
  deliverPackageNum: number
  receivePackageNum: number
  deliverTime: number
  receiveTime: number | null
  inboundTime: number | null
  isPrintBoxMark: boolean
  ifCanOperateDeliver: boolean
  isClothCategory: boolean
  isTargetCategory: boolean | null
  isDisplayCourier: boolean
  urgencyType: number
  purchaseStockType: number
  isCustomProduct: boolean
  receiveAddressInfo: AddressInfo
  deliveryAddressInfo: DeliveryAddressInfo
  driverName: string
  plateNumber: string
  deliveryContactNumber: string
  deliveryContactAreaNo: string
  packageList: PackageItem[]
  packageDetailList: PackageDetailItem[]
  packageReceiveInfoVOList: any[] | null
  expectPickUpGoodsTime: number
  expressBatchSn: string
  inventoryRegion: number
  deliveryOrderCancelLeftTime: number | null
  deliveryOrderCreateTime: number | null
  expressRejectStatus: number
  exceptionFeedBackTotalCount: number
  expressWeightFeedbackStatus: number
  expressWeightFeedbackTip: string | null
  taxWarehouseApplyOperateType: number
  latestFeedbackStatus: number
  expectLatestPickTime: number | null
  needReprintBoxMark: boolean
  operateDeliveryMallName: string | null
  operateDeliveryMallId: number
  hasOperateMallAuth: boolean
  ableEditPackage: boolean
  isPrintCartonMark: boolean
  needReprintCartonMark: boolean
  isCrossEntity: boolean
  crossEntityMallVO: any | null
}

// receiverName, detailAddress, phone

export interface ShoppingItem {
  expressBatchSn: string
  subWarehouseId: number
  subWarehouseName: string
  supplierId: number
  deliveryOrderSn: string
  deliveryMethod: number
  expressDeliverySn: string
  expressCompanyId: number
  tmsChannelId: number
  expressCompany: string
  status: number
  isDisplayCourier: boolean
  receiveAddressInfo: AddressInfo
  deliveryAddressInfo: DeliveryAddressInfo
  driverName: string
  plateNumber: string
  deliveryContactNumber: string
  predictTotalPackageWeight: number
  predictTotalPackageVolume: number
  expressPackageNum: number
  deliveryAddressId: number
  deliveryOrderList: DeliveryOrderItem[]
  expectPickUpGoodsTime: number
  deliveryContactAreaNo: string
  expressBatchStatus: number
  lastExpressCancelType: number
  expressBatchExpressCancelTip: string
  expressCanceledByLogisticsReason: string | null
  expressCanceledByLogisticsReasonType: string | null
  platExpressStatusTip: string
  expressRejectStatus: number
  taxWarehouseApplyOperateType: number
  expressStatus: number
  platformExpressCancelBlameFlag: number | null
  platformExpressCancelBlameReason: string
  operateDeliveryMallId: number
  hasOperateMallAuth: boolean
  canCancelExpress: boolean
  canChangeExpress: boolean
  pickupMethod: any | null
  tmsPickupVO: any | null
  deliveryCartonList: any[]
  servicerCode: string
  canPrintExpressNote: boolean
}
