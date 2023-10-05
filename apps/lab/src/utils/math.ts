export function isCloserThan(
    number1: number,
    number2: number,
    threshold: number
  ): boolean {
    return Math.abs(number1 - number2) < threshold
  }
  