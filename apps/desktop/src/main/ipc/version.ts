import { ipcMain } from 'electron'
import { versionService } from '../services/version.service'

export function registerVersionIpc() {
  // 获取单个版本信息
  ipcMain.handle('version:get', async (event, name: string) => {
    try {
      const version = versionService.getVersionForIPC(name)
      return { success: true, data: version }
    } catch (error) {
      console.error('Failed to get version:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })

  // 获取所有版本信息
  ipcMain.handle('version:get-all', async () => {
    try {
      const versions = versionService.getAllVersionsForIPC()
      return { success: true, data: versions }
    } catch (error) {
      console.error('Failed to get all versions:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })

  // 检查版本更新
  ipcMain.handle('version:check', async (event, name: string) => {
    try {
      const version = await versionService.checkVersion(name)
      return { success: true, data: versionService.getVersionForIPC(name) }
    } catch (error) {
      console.error('Failed to check version:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })

  // 检查所有版本更新
  ipcMain.handle('version:check-all', async () => {
    try {
      const versions = await versionService.checkAllVersions()
      return { success: true, data: versions.map((v) => versionService.getVersionForIPC(v.name)) }
    } catch (error) {
      console.error('Failed to check all versions:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })

  // 安装版本
  ipcMain.handle('version:install', async (event, name: string) => {
    try {
      const success = await versionService.installVersion(name)
      const version = versionService.getVersionForIPC(name)
      return { success, data: version }
    } catch (error) {
      console.error('Failed to install version:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })

  // 更新版本
  ipcMain.handle('version:update', async (event, name: string) => {
    try {
      const success = await versionService.updateVersion(name)
      const version = versionService.getVersionForIPC(name)
      return { success, data: version }
    } catch (error) {
      console.error('Failed to update version:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })

  // 更新所有版本
  ipcMain.handle('version:update-all', async () => {
    try {
      const results = await versionService.updateAllVersions()
      const updatedVersions = results.map((result) => ({
        name: result.name,
        success: result.success,
        data: versionService.getVersionForIPC(result.name)
      }))
      return { success: true, data: updatedVersions }
    } catch (error) {
      console.error('Failed to update all versions:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })

  // 获取版本配置
  ipcMain.handle('version:get-config', () => {
    try {
      return { success: true, data: versionService.getConfig() }
    } catch (error) {
      console.error('Failed to get version config:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })

  // 设置版本配置
  ipcMain.handle('version:set-config', async (event, config: any) => {
    try {
      versionService.setConfig(config)
      return { success: true }
    } catch (error) {
      console.error('Failed to set version config:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  })
}
