export interface VersionInfo {
  name: string
  version: string | null
  latestVersion: string | null
  error: string | null
  status: 'installed' | 'not_installed' | 'error'
  path?: string
  lastChecked?: string
  updateAvailable?: boolean
}

export interface VersionConfig {
  versionCheckInterval: number
  autoUpdateEnabled: boolean
}

export const getVersion = async (name: string): Promise<VersionInfo | null> => {
  try {
    const result = await window.api.invoke('version:get', name)
    if (result.success) {
      return result.data
    } else {
      console.error('Failed to get version:', result.error)
      return null
    }
  } catch (error) {
    console.error('Version API error:', error)
    return null
  }
}

export const getAllVersions = async (): Promise<VersionInfo[]> => {
  try {
    const result = await window.api.version.getAllVersions()
    if (result.success) {
      return result.data || []
    } else {
      throw new Error('Failed to get all versions')
    }
  } catch (error) {
    throw error
  }
}

export const checkVersion = async (name: string): Promise<VersionInfo | null> => {
  try {
    const result = await window.api.invoke('version:check', name)
    if (result.success) {
      return result.data
    } else {
      console.error('Failed to check version:', result.error)
      return null
    }
  } catch (error) {
    console.error('Version API error:', error)
    return null
  }
}

export const checkAllVersions = async (): Promise<VersionInfo[]> => {
  try {
    const result = await window.api.version.checkAllVersions()
    if (result.success) {
      return result.data || []
    } else {
      console.error('Failed to check all versions:', result.error)
      return []
    }
  } catch (error) {
    console.error('Version API error:', error)
    return []
  }
}

export const installVersion = async (name: string): Promise<boolean> => {
  try {
    const result = await window.api.invoke('version:install', name)
    if (result.success) {
      return result.success
    } else {
      console.error('Failed to install version:', result.error)
      return false
    }
  } catch (error) {
    console.error('Version API error:', error)
    return false
  }
}

export const updateVersion = async (name: string): Promise<boolean> => {
  try {
    const result = await window.api.invoke('version:update', name)
    if (result.success) {
      return result.success
    } else {
      console.error('Failed to update version:', result.error)
      return false
    }
  } catch (error) {
    console.error('Version API error:', error)
    return false
  }
}

export const updateAllVersions = async (): Promise<{ name: string; success: boolean }[]> => {
  try {
    const result = await window.api.invoke('version:update-all')
    if (result.success) {
      return result.data || []
    } else {
      console.error('Failed to update all versions:', result.error)
      return []
    }
  } catch (error) {
    console.error('Version API error:', error)
    return []
  }
}

export const getConfig = async (): Promise<VersionConfig | null> => {
  try {
    const result = await window.api.invoke('version:get-config')
    if (result.success) {
      return result.data
    } else {
      console.error('Failed to get version config:', result.error)
      return null
    }
  } catch (error) {
    console.error('Version API error:', error)
    return null
  }
}

export const setConfig = async (config: Partial<VersionConfig>): Promise<boolean> => {
  try {
    const result = await window.api.invoke('version:set-config', config)
    if (result.success) {
      return true
    } else {
      console.error('Failed to set version config:', result.error)
      return false
    }
  } catch (error) {
    console.error('Version API error:', error)
    return false
  }
}
