export const getGradientColor = (_opacity = 1) =>
  `linear-gradient(180deg, #DAFF7D 0%, #7AFF70 100%)`

export const getTextGradient = () => {
  return {
    background: getGradientColor(),
    backgroundClip: 'text',
  }
}
