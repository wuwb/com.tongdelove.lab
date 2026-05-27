import type { Settings, WebDavSyncSettings, RemoteSnapshotInfo } from '@/types'

export interface ConfigTransferResult {
  success: boolean
  message: string
  filePath?: string
  backupId?: string
}

export interface WebDavTestResult {
  success: boolean
  message?: string
}

export interface WebDavSyncResult {
  status: string
}

export const settingsApi = {
  async get(): Promise<Settings> {
    return await window.api.invoke('get_settings')
  },

  async save(settings: Settings): Promise<boolean> {
    return await window.api.invoke('save_settings', { settings })
  },

  async restart(): Promise<boolean> {
    return await window.api.invoke('restart_app')
  },

  async checkUpdates(): Promise<void> {
    await window.api.invoke('check_for_updates')
  },

  async isPortable(): Promise<boolean> {
    return await window.api.invoke('is_portable_mode')
  },

  async getConfigDir(appId: string): Promise<string> {
    return await window.api.invoke('get_config_dir', { app: appId })
  },

  async openConfigFolder(appId: string): Promise<void> {
    await window.api.invoke('open_config_folder', { app: appId })
  },

  async selectConfigDirectory(defaultPath?: string): Promise<string | null> {
    return await window.api.invoke('pick_directory', { defaultPath })
  },

  async getClaudeCodeConfigPath(): Promise<string> {
    return await window.api.invoke('get_claude_code_config_path')
  },

  async getAppConfigPath(): Promise<string> {
    return await window.api.invoke('get_app_config_path')
  },

  async openAppConfigFolder(): Promise<void> {
    await window.api.invoke('open_app_config_folder')
  },

  async getAppConfigDirOverride(): Promise<string | null> {
    return await window.api.invoke('get_app_config_dir_override')
  },

  async setAppConfigDirOverride(path: string | null): Promise<boolean> {
    return await window.api.invoke('set_app_config_dir_override', { path })
  },

  async applyClaudePluginConfig(options: { official: boolean }): Promise<boolean> {
    const { official } = options
    return await window.api.invoke('apply_claude_plugin_config', { official })
  },

  async applyClaudeOnboardingSkip(): Promise<boolean> {
    return await window.api.invoke('apply_claude_onboarding_skip')
  },

  async clearClaudeOnboardingSkip(): Promise<boolean> {
    return await window.api.invoke('clear_claude_onboarding_skip')
  },

  async saveFileDialog(defaultName: string): Promise<string | null> {
    return await window.api.invoke('save_file_dialog', { defaultName })
  },

  async openFileDialog(): Promise<string | null> {
    return await window.api.invoke('open_file_dialog')
  },

  async exportConfigToFile(filePath: string): Promise<ConfigTransferResult> {
    return await window.api.invoke('export_config_to_file', { filePath })
  },

  async importConfigFromFile(filePath: string): Promise<ConfigTransferResult> {
    return await window.api.invoke('import_config_from_file', { filePath })
  },

  // ─── WebDAV v2 sync ───────────────────────────────────────

  async webdavTestConnection(settings: WebDavSyncSettings, preserveEmptyPassword = true): Promise<WebDavTestResult> {
    return await window.api.invoke('webdav_test_connection', {
      settings,
      preserveEmptyPassword
    })
  },

  async webdavSyncUpload(): Promise<WebDavSyncResult> {
    return await window.api.invoke('webdav_sync_upload')
  },

  async webdavSyncDownload(): Promise<WebDavSyncResult> {
    return await window.api.invoke('webdav_sync_download')
  },

  async webdavSyncSaveSettings(settings: WebDavSyncSettings, passwordTouched = false): Promise<{ success: boolean }> {
    return await window.api.invoke('webdav_sync_save_settings', {
      settings,
      passwordTouched
    })
  },

  async webdavSyncFetchRemoteInfo(): Promise<RemoteSnapshotInfo | { empty: true }> {
    return await window.api.invoke('webdav_sync_fetch_remote_info')
  },

  async syncCurrentProvidersLive(): Promise<void> {
    const result = (await window.api.invoke('sync_current_providers_live')) as {
      success?: boolean
      message?: string
    }
    if (!result?.success) {
      throw new Error(result?.message || 'Sync current providers failed')
    }
  },

  async openExternal(url: string): Promise<void> {
    try {
      const u = new URL(url)
      const scheme = u.protocol.replace(':', '').toLowerCase()
      if (scheme !== 'http' && scheme !== 'https') {
        throw new Error('Unsupported URL scheme')
      }
    } catch {
      throw new Error('Invalid URL')
    }
    await window.api.invoke('open_external', { url })
  },

  async setAutoLaunch(enabled: boolean): Promise<boolean> {
    return await window.api.invoke('set_auto_launch', { enabled })
  },

  async getAutoLaunchStatus(): Promise<boolean> {
    return await window.api.invoke('get_auto_launch_status')
  },

  async getToolVersions(
    tools?: string[],
    wslShellByTool?: Record<string, { wslShell?: string | null; wslShellFlag?: string | null }>
  ): Promise<
    Array<{
      name: string
      version: string | null
      latest_version: string | null
      error: string | null
      env_type: 'windows' | 'wsl' | 'macos' | 'linux' | 'unknown'
      wsl_distro: string | null
    }>
  > {
    return await window.api.invoke('get_tool_versions', { tools, wslShellByTool })
  },

  async getRectifierConfig(): Promise<RectifierConfig> {
    return await window.api.invoke('get_rectifier_config')
  },

  async setRectifierConfig(config: RectifierConfig): Promise<boolean> {
    return await window.api.invoke('set_rectifier_config', { config })
  },

  async getOptimizerConfig(): Promise<OptimizerConfig> {
    return await window.api.invoke('get_optimizer_config')
  },

  async setOptimizerConfig(config: OptimizerConfig): Promise<boolean> {
    return await window.api.invoke('set_optimizer_config', { config })
  },

  async getLogConfig(): Promise<LogConfig> {
    return await window.api.invoke('get_log_config')
  },

  async setLogConfig(config: LogConfig): Promise<boolean> {
    return await window.api.invoke('set_log_config', { config })
  }
}

export interface RectifierConfig {
  enabled: boolean
  requestThinkingSignature: boolean
  requestThinkingBudget: boolean
}

export interface OptimizerConfig {
  enabled: boolean
  thinkingOptimizer: boolean
  cacheInjection: boolean
  cacheTtl: string
}

export interface LogConfig {
  enabled: boolean
  level: 'error' | 'warn' | 'info' | 'debug' | 'trace'
}

export interface BackupEntry {
  filename: string
  sizeBytes: number
  createdAt: string
}

export const backupsApi = {
  async createDbBackup(): Promise<string> {
    return await window.api.invoke('create_db_backup')
  },

  async listDbBackups(): Promise<BackupEntry[]> {
    return await window.api.invoke('list_db_backups')
  },

  async restoreDbBackup(filename: string): Promise<string> {
    return await window.api.invoke('restore_db_backup', { filename })
  },

  async renameDbBackup(oldFilename: string, newName: string): Promise<string> {
    return await window.api.invoke('rename_db_backup', { oldFilename, newName })
  },

  async deleteDbBackup(filename: string): Promise<void> {
    await window.api.invoke('delete_db_backup', { filename })
  }
}
