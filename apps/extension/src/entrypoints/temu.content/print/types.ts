export interface PDFData {
  address: string
  barcode?: string
  sku: string
  skuDescription: string
  skuLabel: string
}

export interface PrintProduct {
  address: string
  count: number
  image?: string
  inputCount: number
  mainAttr: string
  skc?: string
  sku: string
  skuLabel: string
  subAttr: string
  title?: string
}
