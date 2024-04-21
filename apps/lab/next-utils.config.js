import pc from 'picocolors'

const nextUtilsConfig = () => {
  const trueEnv = ['true', '1', 'yes']
  const tsconfigPath = process.env.NEXTJS_TSCONFIG_PATH ? process.env.NEXTJS_TSCONFIG_PATH : './tsconfig.json'
  return {
    tsconfigPath,
  }
}

export default {
  loadCustomBuildParams: nextUtilsConfig,
}
