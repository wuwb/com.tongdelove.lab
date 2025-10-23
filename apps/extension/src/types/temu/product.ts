
type Category = {
  "catId": number
  "catName": string
  "catEnName": any | null
  "catType": number | null
}

type ProductProperty = {
  "templatePid": number
  "pid": number
  "refPid": number
  "propName": string
  "vid": number
  "propValue": string
  "valueUnit": string
  "valueExtendInfo": string
  "numberInputValue": string
}

type ProductSkuSpecList = {
  "parentSpecId": number
  "parentSpecName": string
  "specId": number
  "specName": string
  "unitSpecName": any | null
}

type ProductSkuWhExtAttr = {
 "productSkuVolume": {
    "len": number
    "width": number
    "height": number
    "inputLen": any | null
    "inputWidth": any | null
    "inputHeight": any | null
    "inputUnit": any | null
  },
  "productSkuWeight": {
    "value": number
    "inputValue": any | null
    "inputUnit": any | null
  },
  "productSkuVolumeLabel": any | null
  "productSkuWmsVolume": any | null
  "productSkuWmsWeight": any | null
  "productSkuWmsVolumeLabel": any | null
  "productSkuBarCodes": any[]
  "productSkuSensitiveAttr": {
    "isSensitive": number
    "sensitiveTypes": any[]
    "sensitiveList": any[]
    "isForce2Normal": boolean
    "force2NormalTypes": any | null
  },
  "productSkuSensitiveLimit": {
    "maxBatteryCapacity": any | null
    "maxLiquidCapacity": any | null
    "maxKnifeLength": any | null
    "maxBatteryCapacityHp": any | null
    "maxLiquidCapacityHp": any | null
    "maxKnifeLengthHp": any | null
    "knifeTipAngle": any | null
  },
  "productSkuFragileLabelAttr": any | null
  "latestShippingModeEditRecord": any | null
  "productSkuSameReference": any | null
}

type ProductSkuAccessories = {
  "vid": number
  "value": any | null
  "num": number
  "unitCode": number
}

type ProductSkuSaleExtAttr = {
 "productSkuCustomizationTmpl": any | null
  "productSkuShippingMode": any | null
  "productSkuAccessories": {
    "productSkuAccessories": ProductSkuAccessories[]
  },
  "productSkuIndividuallyPacked": number
  "productSkuNetContent": {
    "netContentNumber": any | null
    "netContentUnitCode": any | null
  },
  "totalNetContent": {
    "netContentNumber": any | null
    "netContentUnitCode": any | null
  },
  "mixedType": number
  "productSkuStockDisplayOption": any | null
}

type ProductSkuMultiPack = {
 "skuClassification": number
  "numberOfPieces": number
  "pieceUnitCode": number
  "numberOfPiecesNew": any | null
  "pieceNewUnitCode": any | null
  "individuallyPacked": number
  "productSkuNetContent": {
    "netContentNumber": any | null
    "netContentUnitCode": any | null
  },
  "mixedType": number
  "totalNetContent": {
    "netContentNumber": any | null
    "netContentUnitCode": any | null
  }
}

type ProductSkuSummary = {
  "productSkuId": number
  "thumbUrl": string
  "productSkuSpecList": ProductSkuSpecList[]
  "currencyType": "CNY"
  "financeExchangeRate": any | null
  "supplierPrice": number
  "supplierPriceUS": any | null
  "siteSupplierPrices": any | null
  "extCode": string // "S_B_5"
  "productSkuWhExtAttr": ProductSkuWhExtAttr
  "productSkuSaleExtAttr": ProductSkuSaleExtAttr
  "todaySalesVolume": any | null
  "realStock": any | null
  "virtualStock": any | null
  "virtualStockLimitType": any | null
  "salesStockLockType": any | null
  "stockLockDetailList": any | null
  "tempLockNum": any | null
  "productSkuSemiManagedStock": any | null
  "sampleNetWeight": any | null
  "productSkuCwVOList": any | null
  "productSkuMultiPack": ProductSkuMultiPack
  "priceReviewStatus": number
  "flowLimit": any | null
  "preLimitTime": any | null
}

type ProductJitMode = {
  "matchJitMode": boolean
  "quickSellAgtSignStatus": number
  "signLatestAgt": boolean
}

type ProductPersonalization = {
  "personalizationSwitch": any | null
  "personalizationTmp": any | null
  "signLatestAgt": boolean
  "personalizationAgtSignStatus": number
}

type ProductFragileLabelAttr = {
  "isFragile": boolean
}

type ProductPattern = {
  "canRelatePattern": boolean
  "patternId": any | null
  "isModified": any | null
  "garmentPreviewPics": any | null
  "paperPreviewPics": any | null
  "patternFile": any | null
  "modifiedPaperPreviewPics": any | null
  "modifiedPatternFile": any | null
}

export type ProductSKC = {
  "productId": number
  "productSkcId": number
  "productName": string
  "productType": number
  "sourceType": number
  "goodsId": number
  "leafCat": Category
  "categories": {
      "cat1": Category
      "cat2": Category
      "cat3": Category
      "cat4": Category
      "cat5": Category
      "cat6": Category
      "cat7": Category
      "cat8": Category
      "cat9": Category
      "cat10": Category
      "catType": number
  }
  "productProperties": ProductProperty[]
  "sizeTemplateIds": any | null
  "productTotalSalesVolume": number
  "extCode": string
  "skcStatus": number
  "skcSiteStatus": number
  "mainImageUrl": string
  "last7DaysSalesVolume": any | null
  "productSkuSummaries": ProductSkuSummary[]
  "createdAt": number
  "productJitMode": ProductJitMode
  "productCertAuditStatus": any | null
  "offSaleByNoCert": any | null
  "noCertPunishRecord": any | null
  "productCertConfig": any | null
  "productCertPunish": any | null
  "productPersonalization": ProductPersonalization
  "goodsAdvantageLabelVOList": any | null
  "productTags": any | null
  "productFragileLabelAttr": ProductFragileLabelAttr
  "productGuideFileI18nList": any[]
  "productGuideFileNewVOList": any[]
  "printedGuideFileInfoVO": any | null
  "productPropAdjustTasks": any | null
  "needGuideFile": boolean
  "productGuideFileIfNeed": any | null
  "guideFileStatus": any | null
  "guideFileFailReason": any | null
  "electronicGuideFileComplianceLabel": number
  "printedGuideFileComplianceLabel": number
  "productSelected": boolean
  "canEditSizeTemplate": any | null
  "inProcessEditTasks": any | null
  "productAuditDraft": any | null
  "hasDecoration": boolean
  "hasCarouseVideo": boolean
  "hasDetailVideo": boolean
  "matchSkcJitMode": boolean
  "isJitUnSignForMms": boolean
  "guideFileAttribute": any | null
  "similarClusterProduct": any | null
  "guideFilePageImages": any | null
  "isSupportPersonalization": boolean
  "supplierSourceType": number
  "productSemiManaged": any | null
  "productPublishLabel": any | null
  "productPattern": ProductPattern
  "productCustomizationTechnology": any | null
  "hotSaleGoodsLabelStyle": any | null
  "sensitiveAttrProblemTag": boolean
  "classId": any | null
  "industrySelectionTag": boolean
  "allowanceCertList": any | null
  "flowAllowanceSiteList": any | null
  "flowAllowanceStatus": number
  "newProductCatMisplace": any | null
  "productPotentialInfo": any | null
  "hotSaleCarouselVideoNeedUpload": boolean
  "highPrice": any | null
  "productCreateTime": number
  "adCoupon": any | null
}
