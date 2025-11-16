export interface ProductSKC {
  adCoupon: any | null
  allowanceCertList: any | null
  canEditSizeTemplate: any | null
  categories: {
    cat1: Category
    cat2: Category
    cat3: Category
    cat4: Category
    cat5: Category
    cat6: Category
    cat7: Category
    cat8: Category
    cat9: Category
    cat10: Category
    catType: number
  }
  classId: any | null
  createdAt: number
  electronicGuideFileComplianceLabel: number
  extCode: string
  flowAllowanceSiteList: any | null
  flowAllowanceStatus: number
  goodsAdvantageLabelVOList: any | null
  goodsId: number
  guideFileAttribute: any | null
  guideFileFailReason: any | null
  guideFilePageImages: any | null
  guideFileStatus: any | null
  hasCarouseVideo: boolean
  hasDecoration: boolean
  hasDetailVideo: boolean
  highPrice: any | null
  hotSaleCarouselVideoNeedUpload: boolean
  hotSaleGoodsLabelStyle: any | null
  industrySelectionTag: boolean
  inProcessEditTasks: any | null
  isJitUnSignForMms: boolean
  isSupportPersonalization: boolean
  last7DaysSalesVolume: any | null
  leafCat: Category
  mainImageUrl: string
  matchSkcJitMode: boolean
  needGuideFile: boolean
  newProductCatMisplace: any | null
  noCertPunishRecord: any | null
  offSaleByNoCert: any | null
  printedGuideFileComplianceLabel: number
  printedGuideFileInfoVO: any | null
  productAuditDraft: any | null
  productCertAuditStatus: any | null
  productCertConfig: any | null
  productCertPunish: any | null
  productCreateTime: number
  productCustomizationTechnology: any | null
  productFragileLabelAttr: ProductFragileLabelAttr
  productGuideFileI18nList: any[]
  productGuideFileIfNeed: any | null
  productGuideFileNewVOList: any[]
  productId: number
  productJitMode: ProductJitMode
  productName: string
  productPattern: ProductPattern
  productPersonalization: ProductPersonalization
  productPotentialInfo: any | null
  productPropAdjustTasks: any | null
  productProperties: ProductProperty[]
  productPublishLabel: any | null
  productSelected: boolean
  productSemiManaged: any | null
  productSkcId: number
  productSkuSummaries: ProductSkuSummary[]
  productTags: any | null
  productTotalSalesVolume: number
  productType: number
  sensitiveAttrProblemTag: boolean
  similarClusterProduct: any | null
  sizeTemplateIds: any | null
  skcSiteStatus: number
  skcStatus: number
  sourceType: number
  supplierSourceType: number
}

interface Category {
  catEnName: any | null
  catId: number
  catName: string
  catType: null | number
}

interface ProductFragileLabelAttr {
  isFragile: boolean
}

interface ProductJitMode {
  matchJitMode: boolean
  quickSellAgtSignStatus: number
  signLatestAgt: boolean
}

interface ProductPattern {
  canRelatePattern: boolean
  garmentPreviewPics: any | null
  isModified: any | null
  modifiedPaperPreviewPics: any | null
  modifiedPatternFile: any | null
  paperPreviewPics: any | null
  patternFile: any | null
  patternId: any | null
}

interface ProductPersonalization {
  personalizationAgtSignStatus: number
  personalizationSwitch: any | null
  personalizationTmp: any | null
  signLatestAgt: boolean
}

interface ProductProperty {
  numberInputValue: string
  pid: number
  propName: string
  propValue: string
  refPid: number
  templatePid: number
  valueExtendInfo: string
  valueUnit: string
  vid: number
}

interface ProductSkuAccessories {
  num: number
  unitCode: number
  value: any | null
  vid: number
}

interface ProductSkuMultiPack {
  individuallyPacked: number
  mixedType: number
  numberOfPieces: number
  numberOfPiecesNew: any | null
  pieceNewUnitCode: any | null
  pieceUnitCode: number
  productSkuNetContent: {
    netContentNumber: any | null
    netContentUnitCode: any | null
  }
  skuClassification: number
  totalNetContent: {
    netContentNumber: any | null
    netContentUnitCode: any | null
  }
}

interface ProductSkuSaleExtAttr {
  mixedType: number
  productSkuAccessories: {
    productSkuAccessories: ProductSkuAccessories[]
  }
  productSkuCustomizationTmpl: any | null
  productSkuIndividuallyPacked: number
  productSkuNetContent: {
    netContentNumber: any | null
    netContentUnitCode: any | null
  }
  productSkuShippingMode: any | null
  productSkuStockDisplayOption: any | null
  totalNetContent: {
    netContentNumber: any | null
    netContentUnitCode: any | null
  }
}

interface ProductSkuSpecList {
  parentSpecId: number
  parentSpecName: string
  specId: number
  specName: string
  unitSpecName: any | null
}

interface ProductSkuSummary {
  currencyType: 'CNY'
  extCode: string // "S_B_5"
  financeExchangeRate: any | null
  flowLimit: any | null
  preLimitTime: any | null
  priceReviewStatus: number
  productSkuCwVOList: any | null
  productSkuId: number
  productSkuMultiPack: ProductSkuMultiPack
  productSkuSaleExtAttr: ProductSkuSaleExtAttr
  productSkuSemiManagedStock: any | null
  productSkuSpecList: ProductSkuSpecList[]
  productSkuWhExtAttr: ProductSkuWhExtAttr
  realStock: any | null
  salesStockLockType: any | null
  sampleNetWeight: any | null
  siteSupplierPrices: any | null
  stockLockDetailList: any | null
  supplierPrice: number
  supplierPriceUS: any | null
  tempLockNum: any | null
  thumbUrl: string
  todaySalesVolume: any | null
  virtualStock: any | null
  virtualStockLimitType: any | null
}

interface ProductSkuWhExtAttr {
  latestShippingModeEditRecord: any | null
  productSkuBarCodes: any[]
  productSkuFragileLabelAttr: any | null
  productSkuSameReference: any | null
  productSkuSensitiveAttr: {
    force2NormalTypes: any | null
    isForce2Normal: boolean
    isSensitive: number
    sensitiveList: any[]
    sensitiveTypes: any[]
  }
  productSkuSensitiveLimit: {
    knifeTipAngle: any | null
    maxBatteryCapacity: any | null
    maxBatteryCapacityHp: any | null
    maxKnifeLength: any | null
    maxKnifeLengthHp: any | null
    maxLiquidCapacity: any | null
    maxLiquidCapacityHp: any | null
  }
  productSkuVolume: {
    height: number
    inputHeight: any | null
    inputLen: any | null
    inputUnit: any | null
    inputWidth: any | null
    len: number
    width: number
  }
  productSkuVolumeLabel: any | null
  productSkuWeight: {
    inputUnit: any | null
    inputValue: any | null
    value: number
  }
  productSkuWmsVolume: any | null
  productSkuWmsVolumeLabel: any | null
  productSkuWmsWeight: any | null
}
