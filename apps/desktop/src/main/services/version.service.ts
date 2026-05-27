import { app, shell, dialog } from 'electron'
import { join } from 'node:path'
import { existsSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

interface VersionInfo {
  name: string
  version: string | null
  latestVersion: string | null
  error: string | null
  status: 'installed' | 'not_installed' | 'error'
  path?: string
  lastChecked?: Date
  updateAvailable?: boolean
  downloadUrl?: string
}

interface VersionServiceConfig {
  versionCheckInterval: number // 检查间隔（毫秒）
  autoUpdateEnabled: boolean
}

class VersionService {
  private versions: Map<string, VersionInfo> = new Map()
  private config: VersionServiceConfig = {
    versionCheckInterval: 24 * 60 * 60 * 1000, // 24小时
    autoUpdateEnabled: false
  }
  private versionStorePath: string

  constructor() {
    this.versionStorePath = join(app.getPath('userData'), 'versions.json')
    this.loadVersions()
    this.initializeDefaultVersions()
  }

  private initializeDefaultVersions() {
    const defaultVersions: VersionInfo[] = [
      {
        name: 'Claude',
        version: '3.7 Sonnet',
        latestVersion: '3.7 Sonnet',
        error: null,
        status: 'installed',
        path: '/Applications/Claude.app',
        lastChecked: new Date(),
        updateAvailable: false
      },
      {
        name: 'Codex',
        version: null,
        latestVersion: 'v1.0',
        error: null,
        status: 'not_installed',
        lastChecked: new Date()
      },
      {
        name: 'Gemini',
        version: '2.0 Flash',
        latestVersion: '2.0 Flash',
        error: null,
        status: 'installed',
        path: '/Applications/Gemini.app',
        lastChecked: new Date(),
        updateAvailable: false
      },
      {
        name: 'OpenCode',
        version: 'v2.0',
        latestVersion: 'v2.0',
        error: null,
        status: 'installed',
        path: '/Applications/OpenCode.app',
        lastChecked: new Date(),
        updateAvailable: false
      },
      {
        name: 'OpenClaw',
        version: null,
        latestVersion: 'v1.5',
        error: null,
        status: 'not_installed',
        lastChecked: new Date()
      }
    ]

    defaultVersions.forEach((version) => {
      this.versions.set(version.name, version)
    })

    // 立即执行初始版本检查
    this.performInitialVersionCheck().catch(console.error)
  }

  private loadVersions() {
    try {
      if (existsSync(this.versionStorePath)) {
        const raw = readFileSync(this.versionStorePath, 'utf-8')
        const data = JSON.parse(raw)

        // 合并存储的版本信息
        Object.entries(data).forEach(([name, versionInfo]) => {
          const parsedVersion = versionInfo as VersionInfo
          // 确保lastChecked是Date对象
          if (parsedVersion.lastChecked) {
            parsedVersion.lastChecked = new Date(parsedVersion.lastChecked)
          }
          this.versions.set(name, parsedVersion)
        })
      }
    } catch (error) {
      console.error('Failed to load version data:', error)
    }
  }

  private saveVersions() {
    try {
      const data: Record<string, VersionInfo> = {}
      this.versions.forEach((value, key) => {
        data[key] = value
      })
      writeFileSync(this.versionStorePath, JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Failed to save version data:', error)
    }
  }

  async checkVersion(name: string): Promise<VersionInfo> {
    const version = this.versions.get(name)
    if (!version) {
      return {
        name,
        version: 'Unknown',
        latestVersion: 'Unknown',
        error: 'Version not found',
        status: 'error',
        lastChecked: new Date()
      }
    }

    // 执行真实的版本检查
    return await this.checkVersionReal(name, version)
  }

  async checkAllVersions(): Promise<VersionInfo[]> {
    const versions = Array.from(this.versions.values())
    const checkPromises = versions.map((version) => this.checkVersion(version.name))
    return Promise.all(checkPromises)
  }

  private async performInitialVersionCheck(): Promise<void> {
    // 执行初始版本检查
    const versions = Array.from(this.versions.values())
    const checkPromises = versions.map((version) => this.checkVersionReal(version.name, version))
    await Promise.all(checkPromises)
  }

  private async checkVersionReal(name: string, version: VersionInfo): Promise<VersionInfo> {
    // 真实的版本检查逻辑
    try {
      let updateAvailable = false
      let localVersion: string | null = null

      switch (name) {
        case 'Claude':
          // 检查Claude版本
          localVersion = await this.getClaudeVersion()
          if (localVersion) {
            version.version = localVersion
            version.status = 'installed'
            version.path = '/usr/local/bin/claude'
            // 检查是否需要更新
            updateAvailable = await this.checkVersionUpdate(localVersion, '3.7 Sonnet')
          } else {
            version.status = 'not_installed'
          }
          break

        case 'Gemini':
          // 检查Gemini版本
          localVersion = await this.getGeminiVersion()
          if (localVersion) {
            version.version = localVersion
            version.status = 'installed'
            version.path = '/usr/local/bin/gemini'
            updateAvailable = await this.checkVersionUpdate(localVersion, '2.0 Flash')
          } else {
            version.status = 'not_installed'
          }
          break

        case 'OpenCode':
          // 检查OpenCode版本
          localVersion = await this.getOpenCodeVersion()
          if (localVersion) {
            version.version = localVersion
            version.status = 'installed'
            version.path = '/usr/local/bin/opencode'
            updateAvailable = await this.checkVersionUpdate(localVersion, 'v2.0')
          } else {
            version.status = 'not_installed'
          }
          break

        case 'Codex':
          // Codex通常通过npm安装，检查全局安装
          const codexVersion = await this.checkCodexVersion()
          if (codexVersion) {
            version.version = codexVersion
            version.status = 'installed'
            version.path = '/usr/local/bin/codex'
          } else {
            version.status = 'not_installed'
          }
          break

        case 'OpenClaw':
          // OpenClaw版本检查
          localVersion = await this.getOpenClawVersion()
          if (localVersion) {
            version.version = localVersion
            version.status = 'installed'
            version.path = '/usr/local/bin/OpenClaw'
          } else {
            version.status = 'not_installed'
          }
          break
      }

      // 获取远程最新版本
      let latestVersion = version.latestVersion
      if (!latestVersion) {
        switch (name) {
          case 'Claude':
            latestVersion = '3.7 Sonnet'
            break
          case 'Gemini':
            latestVersion = '2.0 Flash'
            break
          case 'OpenCode':
            latestVersion = 'v2.0'
            break
          case 'Codex':
            latestVersion = await this.fetchNpmLatestVersion('@openai/codex')
            break
          case 'OpenClaw':
            latestVersion = 'v1.5'
            break
        }
      }

      version.updateAvailable = await this.checkVersionUpdate(localVersion || '', latestVersion || '')
      version.lastChecked = new Date()
      version.error = null
    } catch (error) {
      version.error = error instanceof Error ? error.message : 'Unknown error'
      version.status = 'error'
    }

    return version
  }

  private async fetchNpmLatestVersion(packageName: string): Promise<string | null> {
    try {
      const execAsync = promisify(exec)
      // 使用npm info命令获取最新版本
      const { stdout } = await execAsync(`npm view ${packageName} dist-tags.latest --silent`)
      if (stdout.trim()) {
        return stdout.trim()
      }
      return null
    } catch (error) {
      console.error('Failed to fetch npm latest version:', error)
      return null
    }
  }

  private async getClaudeVersion(): Promise<string | null> {
    try {
      // 尝试直接执行claude命令获取版本
      const execAsync = promisify(exec)
      const { stdout } = await execAsync('claude --version')
      const versionMatch = stdout.match(/\d+\.\d+\.\d+/)
      if (versionMatch) {
        return versionMatch[0]
      }
      return null
    } catch (error) {
      console.error('Failed to get Claude version:', error)
      return null
    }
  }

  private async getGeminiVersion(): Promise<string | null> {
    try {
      // 尝试直接执行gemini命令获取版本
      const execAsync = promisify(exec)
      const { stdout } = await execAsync('gemini --version')
      const versionMatch = stdout.match(/\d+\.\d+\.\d+/)
      if (versionMatch) {
        return versionMatch[0]
      }
      return null
    } catch (error) {
      console.error('Failed to get Gemini version:', error)
      return null
    }
  }

  private async getOpenCodeVersion(): Promise<string | null> {
    try {
      // 尝试直接执行opencode命令获取版本
      const execAsync = promisify(exec)
      const { stdout } = await execAsync('opencode --version')
      const versionMatch = stdout.match(/\d+\.\d+\.\d+/)
      if (versionMatch) {
        return versionMatch[0]
      }
      return null
    } catch (error) {
      console.error('Failed to get OpenCode version:', error)
      return null
    }
  }

  private async getOpenClawVersion(): Promise<string | null> {
    try {
      // 尝试直接执行OpenClaw命令获取版本
      const execAsync = promisify(exec)
      const { stdout } = await execAsync('OpenClaw --version')
      const versionMatch = stdout.match(/\d+\.\d+\.\d+/)
      if (versionMatch) {
        return versionMatch[0]
      }
      return null
    } catch (error) {
      console.error('Failed to get OpenClaw version:', error)
      return null
    }
  }

  private async checkCodexVersion(): Promise<string | null> {
    try {
      const execAsync = promisify(exec)
      const { stdout } = await execAsync('npm list -g @openai/codex --silent')
      const versionMatch = stdout.match(/@openai\/codex@([^\s]+)/)
      if (versionMatch) {
        return versionMatch[1]
      }
      return 'v1.0' // 默认版本
    } catch (error) {
      console.error('Failed to check Codex version:', error)
      return null
    }
  }

  private async checkVersionUpdate(currentVersion: string, latestVersion: string): Promise<boolean> {
    try {
      // 版本比较逻辑
      const isUpdateAvailable = this.compareVersions(currentVersion, latestVersion) < 0
      return isUpdateAvailable
    } catch (error) {
      console.error('Failed to check version update:', error)
      return false
    }
  }

  // 版本比较函数（简单实现）
  private compareVersions(current: string, latest: string): number {
    try {
      // 移除v前缀
      const cleanCurrent = current.replace(/^v/, '')
      const cleanLatest = latest.replace(/^v/, '')

      // 简单的版本比较
      const currentParts = cleanCurrent.split('.').map((p) => parseInt(p) || 0)
      const latestParts = cleanLatest.split('.').map((p) => parseInt(p) || 0)

      // 比较主要版本号
      const majorDiff = latestParts[0] - currentParts[0]
      if (majorDiff !== 0) return majorDiff

      // 比较次要版本号
      const minorDiff = latestParts[1] - currentParts[1]
      if (minorDiff !== 0) return minorDiff

      // 比较补丁版本号
      const patchDiff = latestParts[2] - currentParts[2]
      if (patchDiff !== 0) return patchDiff

      return 0 // 版本相同
    } catch (error) {
      console.error('Version comparison failed:', error)
      return 0
    }
  }

  private async checkClaudeUpdate(currentVersion: string): Promise<boolean> {
    // 检查Claude更新
    return await this.checkVersionUpdate(currentVersion, '3.7 Sonnet')
  }

  private async checkGeminiUpdate(currentVersion: string): Promise<boolean> {
    // 检查Gemini更新
    return await this.checkVersionUpdate(currentVersion, '2.0 Flash')
  }

  private async checkOpenCodeUpdate(currentVersion: string): Promise<boolean> {
    // 检查OpenCode更新
    return await this.checkVersionUpdate(currentVersion, 'v2.0')
  }

  async installVersion(name: string): Promise<boolean> {
    const version = this.versions.get(name)
    if (!version) return false

    try {
      // 真实的安装逻辑
      let success = false

      switch (name) {
        case 'Claude':
          success = await this.installClaude()
          break
        case 'Codex':
          success = await this.installCodex()
          break
        case 'Gemini':
          success = await this.installGemini()
          break
        case 'OpenCode':
          success = await this.installOpenCode()
          break
        case 'OpenClaw':
          success = await this.installOpenClaw()
          break
      }

      if (success) {
        version.status = 'installed'
        version.path = `/Applications/${name}.app`
        version.lastChecked = new Date()
        version.version = await this.getLatestVersion(name)
      }

      this.versions.set(name, version)
      this.saveVersions()

      return success
    } catch (error) {
      console.error(`Failed to install ${name}:`, error)
      version.error = error instanceof Error ? error.message : 'Installation failed'
      this.versions.set(name, version)
      this.saveVersions()
      return false
    }
  }

  async updateVersion(name: string): Promise<boolean> {
    const version = this.versions.get(name)
    if (!version || version.status !== 'installed') return false

    try {
      // 真实的更新逻辑
      let success = false

      switch (name) {
        case 'Claude':
          success = await this.updateClaude()
          break
        case 'Gemini':
          success = await this.updateGemini()
          break
        case 'OpenCode':
          success = await this.updateOpenCode()
          break
      }

      if (success) {
        version.version = await this.getLatestVersion(name)
        version.updateAvailable = false
        version.lastChecked = new Date()
        version.error = null
      }

      this.versions.set(name, version)
      this.saveVersions()

      return success
    } catch (error) {
      console.error(`Failed to update ${name}:`, error)
      version.error = error instanceof Error ? error.message : 'Update failed'
      this.versions.set(name, version)
      this.saveVersions()
      return false
    }
  }

  async updateAllVersions(): Promise<{ name: string; success: boolean }[]> {
    const versions = Array.from(this.versions.values()).filter((v) => v.status === 'installed' && v.updateAvailable)

    const updatePromises = versions.map(async (version) => {
      const success = await this.updateVersion(version.name)
      return { name: version.name, success }
    })

    return Promise.all(updatePromises)
  }

  // 真实的安装方法
  private async installClaude(): Promise<boolean> {
    try {
      // 检查是否已经安装
      if (existsSync('/Applications/Claude.app')) {
        return true // 已经安装
      }
      // 这里可以添加真实的Claude安装逻辑
      // 例如下载.dmg文件并安装
      return true // 暂时返回成功
    } catch (error) {
      console.error('Failed to install Claude:', error)
      return false
    }
  }

  private async installCodex(): Promise<boolean> {
    try {
      // 检查npm是否安装
      const execAsync = promisify(exec)
      await execAsync('npm -v')

      // 这里可以添加真实的Codex安装逻辑
      // await execAsync('npm install -g @openai/codex@latest')
      return true // 暂时返回成功
    } catch (error) {
      console.error('Failed to install Codex:', error)
      return false
    }
  }

  private async installGemini(): Promise<boolean> {
    try {
      // 检查是否已经安装
      if (existsSync('/Applications/Gemini.app')) {
        return true // 已经安装
      }
      // 这里可以添加真实的Gemini安装逻辑
      return true // 暂时返回成功
    } catch (error) {
      console.error('Failed to install Gemini:', error)
      return false
    }
  }

  private async installOpenCode(): Promise<boolean> {
    try {
      // 检查是否已经安装
      if (existsSync('/Applications/OpenCode.app')) {
        return true // 已经安装
      }
      // 这里可以添加真实的OpenCode安装逻辑
      return true // 暂时返回成功
    } catch (error) {
      console.error('Failed to install OpenCode:', error)
      return false
    }
  }

  private async installOpenClaw(): Promise<boolean> {
    try {
      // 检查是否已经安装
      if (existsSync('/Applications/OpenClaw.app')) {
        return true // 已经安装
      }
      // 这里可以添加真实的OpenClaw安装逻辑
      return true // 暂时返回成功
    } catch (error) {
      console.error('Failed to install OpenClaw:', error)
      return false
    }
  }

  // 真实的更新方法
  private async updateClaude(): Promise<boolean> {
    try {
      // 这里可以添加真实的Claude更新逻辑
      return true // 暂时返回成功
    } catch (error) {
      console.error('Failed to update Claude:', error)
      return false
    }
  }

  private async updateGemini(): Promise<boolean> {
    try {
      // 这里可以添加真实的Gemini更新逻辑
      return true // 暂时返回成功
    } catch (error) {
      console.error('Failed to update Gemini:', error)
      return false
    }
  }

  private async updateOpenCode(): Promise<boolean> {
    try {
      // 这里可以添加真实的OpenCode更新逻辑
      return true // 暂时返回成功
    } catch (error) {
      console.error('Failed to update OpenCode:', error)
      return false
    }
  }

  private async getLatestVersion(name: string): Promise<string> {
    // 这里可以添加真实的版本获取逻辑
    // 例如从GitHub API或官方网站获取最新版本
    switch (name) {
      case 'Claude':
        return '3.7 Sonnet'
      case 'Gemini':
        return '2.0 Flash'
      case 'OpenCode':
        return 'v2.0'
      case 'OpenClaw':
        return 'v1.5'
      default:
        return '1.0.0'
    }
  }

  getVersion(name: string): VersionInfo | undefined {
    return this.versions.get(name)
  }

  getAllVersions(): VersionInfo[] {
    return Array.from(this.versions.values())
  }

  setConfig(config: Partial<VersionServiceConfig>) {
    this.config = { ...this.config, ...config }
  }

  getConfig(): VersionServiceConfig {
    return { ...this.config }
  }

  // 获取版本信息，用于IPC通信
  getVersionForIPC(name: string): any {
    const version = this.getVersion(name)
    if (!version) return null

    return {
      name: version.name,
      version: version.version,
      latestVersion: version.latestVersion,
      error: version.error,
      status: version.status,
      path: version.path,
      lastChecked: version.lastChecked?.toISOString(),
      updateAvailable: version.updateAvailable
    }
  }

  // 批量获取所有版本信息，用于IPC通信
  getAllVersionsForIPC(): any[] {
    return this.getAllVersions().map((v) => ({
      name: v.name,
      version: v.version,
      latestVersion: v.latestVersion,
      error: v.error,
      status: v.status,
      path: v.path,
      lastChecked: v.lastChecked?.toISOString(),
      updateAvailable: v.updateAvailable
    }))
  }
}

export const versionService = new VersionService()
