import { IPC } from "@/shared/ipc"

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

// 获取单个版本信息
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

// 获取所有版本信息
export const getAllVersions = async (): Promise<VersionInfo[]> => {
  try {
    const result = await window.api.version(IPC.VERSION.GET)
    if (result.success) {
      return result.data || []
    } else {
      console.error('Failed to get all versions:', result.error)
      return []
    }
  } catch (error) {
    console.error('Version API error:', error)
    return []
  }
}

// 检查版本更新
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

// 检查所有版本更新
export const checkAllVersions = async (): Promise<VersionInfo[]> => {
  try {
    const result = await window.api.invoke('version:check-all')
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

// 安装版本
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

// 更新版本
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

// 更新所有版本
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

// 获取版本配置
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

// 设置版本配置
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
