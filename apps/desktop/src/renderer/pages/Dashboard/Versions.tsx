import { useState, useEffect } from 'react'
import {
  getAllVersions,
  checkVersion,
  checkAllVersions,
  installVersion,
  updateVersion,
  updateAllVersions,
} from '../../lib/version-api'
import type { VersionInfo } from '../../lib/version-api'
import { toast } from "sonner"

const TOOL_DISPLAY_NAMES: Record<string, string> = {
  claude: 'Claude',
  codex: 'Codex',
  openclaw: 'OpenClaw',
  gemin: 'Gemini',
  opencode: 'OpenCode',
}

export const Versions = () => {
  const [versions, setVersions] = useState<VersionInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState<string | null>(null)
  const [updatingAll, setUpdatingAll] = useState(false)

  useEffect(() => {
    loadVersions()
  }, [])

  const loadVersions = async () => {
    setLoading(true)
    try {
      const versionData = await getAllVersions()
      setVersions(versionData)
    } catch (error) {
      toast("Failed to load versions.")
      setVersions([])
    } finally {
      setLoading(false)
    }
  }

  const handleCheckAllVersions = async () => {
    setLoading(true)
    try {
      await checkAllVersions()
      await loadVersions()
    } catch (error) {
      toast("Failed to check all versions.")
    } finally {
      setLoading(false)
    }
  }

  const handleInstallVersion = async (name: string) => {
    setUpdating(name)
    try {
      await installVersion(name)
      await loadVersions()
    } catch (error) {
      console.error('Failed to install version:', error)
    } finally {
      setUpdating(null)
    }
  }

  const handleUpdateVersion = async (name: string) => {
    setUpdating(name)
    try {
      await updateVersion(name)
      await loadVersions()
    } catch (error) {
      console.error('Failed to update version:', error)
    } finally {
      setUpdating(null)
    }
  }

  const handleUpdateAll = async () => {
    setUpdatingAll(true)
    try {
      await updateAllVersions()
      await loadVersions()
    } catch (error) {
      console.error('Failed to update all versions:', error)
    } finally {
      setUpdatingAll(false)
    }
  }

  const handleCheckVersion = async (name: string) => {
    setUpdating(name)
    try {
      await checkVersion(name)
      await loadVersions()
    } catch (error) {
      console.error('Failed to check version:', error)
    } finally {
      setUpdating(null)
    }
  }
  const getDisplayName = (name: string): string => {
    return TOOL_DISPLAY_NAMES[name] || name
  }

  const getStatusBadge = (status: string, updateAvailable?: boolean) => {
    if (status === 'installed' && updateAvailable) {
      return { text: '可更新', bg: '#fef3c7', color: '#b45309' }
    }
    if (status === 'installed') {
      return { text: '已安装', bg: '#dcfce7', color: '#166534' }
    }
    if (status === 'error') {
      return { text: '错误', bg: '#fee2e2', color: '#dc2626' }
    }
    return { text: '未安装', bg: '#f3f4f6', color: '#6b7280' }
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          flex: 1,
        }}
      >
        <div style={{ padding: '20px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <h2
              style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}
            >
              开发工具版本管理
            </h2>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              共 {versions.length} 个工具
            </div>
          </div>

          {/* 版本对比表格头部 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr 1fr 1fr 120px',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: '#f9fafb',
              borderRadius: '6px 6px 0 0',
              border: '1px solid #e5e7eb',
              borderBottom: 'none',
              fontSize: '12px',
              fontWeight: '600',
              color: '#6b7280',
            }}
          >
            <div>工具名称</div>
            <div>当前版本</div>
            <div>最新版本</div>
            <div>状态</div>
            <div style={{ textAlign: 'center' }}>操作</div>
          </div>

          {/* 版本列表 */}
          <div
            style={{ border: '1px solid #e5e7eb', borderRadius: '0 0 6px 6px' }}
          >
            {loading && versions.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#6b7280',
                }}
              >
                正在加载版本信息...
              </div>
            ) : versions.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#6b7280',
                }}
              >
                暂无版本信息
              </div>
            ) : (
              versions.map((item, index) => {
                const badge = getStatusBadge(item.status, item.updateAvailable)
                const isUpToDate =
                  item.status === 'installed' && !item.updateAvailable
                const hasUpdate =
                  item.status === 'installed' && item.updateAvailable

                return (
                  <div
                    key={item.name}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.5fr 1fr 1fr 1fr 120px',
                      gap: '12px',
                      padding: '16px',
                      alignItems: 'center',
                      borderBottom:
                        index < versions.length - 1
                          ? '1px solid #e5e7eb'
                          : 'none',
                      backgroundColor: hasUpdate
                        ? '#fffbeb'
                        : index % 2 === 0
                          ? 'white'
                          : '#f9fafb',
                    }}
                  >
                    {/* 工具名称 */}
                    <div>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#111827',
                        }}
                      >
                        {getDisplayName(item.name)}
                      </div>
                      {item.path && (
                        <div
                          style={{
                            fontSize: '11px',
                            color: '#9ca3af',
                            marginTop: '2px',
                          }}
                        >
                          {item.path}
                        </div>
                      )}
                    </div>

                    {/* 当前版本 */}
                    <div
                      style={{
                        fontSize: '13px',
                        color: item.version ? '#374151' : '#9ca3af',
                      }}
                    >
                      {item.version || '-'}
                    </div>

                    {/* 最新版本 */}
                    <div
                      style={{
                        fontSize: '13px',
                        color: item.latestVersion ? '#374151' : '#9ca3af',
                      }}
                    >
                      {item.latestVersion || '-'}
                    </div>

                    {/* 状态 */}
                    <div>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          fontWeight: '500',
                          backgroundColor: badge.bg,
                          color: badge.color,
                        }}
                      >
                        {badge.text}
                      </span>
                      {hasUpdate && (
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#f59e0b',
                            marginTop: '4px',
                          }}
                        >
                          有新版本可用
                        </div>
                      )}
                      {item.error && (
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#dc2626',
                            marginTop: '4px',
                          }}
                        >
                          {item.error}
                        </div>
                      )}
                    </div>

                    {/* 操作按钮 */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      {hasUpdate && (
                        <button
                          onClick={() => handleUpdateVersion(item.name)}
                          disabled={updating !== null}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '4px',
                            border: '1px solid #3b82f6',
                            backgroundColor:
                              updating === item.name ? '#93c5fd' : '#3b82f6',
                            color: 'white',
                            fontSize: '11px',
                            cursor:
                              updating === item.name
                                ? 'not-allowed'
                                : 'pointer',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {updating === item.name ? '更新中...' : '升级'}
                        </button>
                      )}
                      {item.status === 'not_installed' && (
                        <button
                          onClick={() => handleInstallVersion(item.name)}
                          disabled={updating !== null}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '4px',
                            border: '1px solid #10b981',
                            backgroundColor:
                              updating === item.name ? '#6ee7b7' : '#10b981',
                            color: 'white',
                            fontSize: '11px',
                            cursor:
                              updating === item.name
                                ? 'not-allowed'
                                : 'pointer',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {updating === item.name ? '安装中...' : '安装'}
                        </button>
                      )}
                      {item.status === 'error' && (
                        <button
                          onClick={() => handleCheckVersion(item.name)}
                          disabled={updating !== null}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '4px',
                            border: '1px solid #ef4444',
                            backgroundColor:
                              updating === item.name ? '#fecaca' : '#ef4444',
                            color: 'white',
                            fontSize: '11px',
                            cursor:
                              updating === item.name
                                ? 'not-allowed'
                                : 'pointer',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {updating === item.name ? '检查中...' : '重试'}
                        </button>
                      )}
                      {isUpToDate && (
                        <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                          已是最新
                        </span>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* 操作按钮 */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '20px',
              justifyContent: 'flex-end',
            }}
          >
            <button
              onClick={loadVersions}
              disabled={loading}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                backgroundColor: loading ? '#f3f4f6' : 'white',
                color: '#374151',
                fontSize: '13px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {loading ? '刷新中...' : '刷新列表'}
            </button>
            <button
              onClick={handleCheckAllVersions}
              disabled={loading}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                backgroundColor: loading ? '#f3f4f6' : 'white',
                color: '#374151',
                fontSize: '13px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {loading ? '检查中...' : '检查更新'}
            </button>
            {versions.some(
              v => v.status === 'installed' && v.updateAvailable
            ) && (
                <button
                  onClick={handleUpdateAll}
                  disabled={updatingAll || loading}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1px solid #3b82f6',
                    backgroundColor:
                      updatingAll || loading ? '#93c5fd' : '#3b82f6',
                    color: 'white',
                    fontSize: '13px',
                    cursor: updatingAll || loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {updatingAll ? '更新中...' : '一键升级全部'}
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
