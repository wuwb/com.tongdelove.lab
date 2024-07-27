import { onLCP, onFID, onCLS, onFCP, onTTFB } from 'web-vitals'

export const reportWebVitals = (onPerfEntry?) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry)
    onFID(onPerfEntry)
    onFCP(onPerfEntry)
    onLCP(onPerfEntry)
    onTTFB(onPerfEntry)
  }
}
