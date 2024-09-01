const nextUtilsConfig = () => {
  const tsconfigPath = process.env.NEXTJS_TSCONFIG_PATH
    ? process.env.NEXTJS_TSCONFIG_PATH
    : './tsconfig.json'
  return {
    tsconfigPath,
  }
}

export default {
  loadCustomBuildParams: nextUtilsConfig,
}
