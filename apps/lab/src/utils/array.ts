export function batchArray<T>(array: T[], batchSize: number): T[][] {
    const batches: T[][] = []
    const length = array.length
  
    for (let i = 0; i < length; i += batchSize) {
      const batch = array.slice(i, i + batchSize)
      batches.push(batch)
    }
  
    return batches
  }
  
  export function cumulativeSum(array: number[]): number[] {
    const result: number[] = []
    let sum = 0
    for (const value of array) {
      sum += value
      result.push(sum)
    }
    return result
  }
  