import { useState, useEffect } from 'react'
import { X, Upload, User, RefreshCw } from 'lucide-react'

interface Provider {
  id: string
  name: string
  type: string
  avatar: string
  remark?: string // Service provider remarks/notes
  officialUrl?: string // Official website URL
  baseUrl?: string
  apiKeys?: string[]
  defaultModel?: string
  models?: any[]
  enabled?: boolean
  apiSettings?: any
}

interface AddProviderDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (provider: Omit<Provider, 'id'>) => void
  editingProvider?: Provider | null
}

const BUILTIN_AVATARS = [
  '🤖', // 机器人
  '🧠', // 大脑
  '🦾', // 麋克
  '⚡', // 闪电
  '🚀', // 火箭
  '💎', // 钻石
  '🌟', // 星星
  '🔮', // 宝石
  '🎯', // 靶心
  '🎨', // 调色板
  '🧪', // 试管
  '🔬', // 显微镜
  '📊', // 图表
  '⚙️', // 齮子
  '🌐', // 地球
  '☁️', // 云
  '🔑', // 钥匙
  '🎭', // 面具
  '🎪', // 马戏头
  '📎', // 别针
  '🎁', // 礼物
  '🏭', // 工厂
  '🔔'  // 铃铛
]

const PROVIDER_TYPES = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'openai-response', label: 'OpenAI-Response' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'azure-openai', label: 'Azure OpenAI' },
  { value: 'new-api', label: 'New API' },
  { value: 'ollama', label: 'Ollama' },
  { value: 'custom', label: 'Custom' }
]

export function AddProviderDialog({ isOpen, onClose, onAdd, editingProvider }: AddProviderDialogProps) {
  const [name, setName] = useState('')
  const [type, setType] = useState('openai')
  const [avatar, setAvatar] = useState('🤖')
  const [avatarType, setAvatarType] = useState<'builtin' | 'custom'>('builtin')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [remark, setRemark] = useState('') // Service provider remarks/notes
  const [officialUrl, setOfficialUrl] = useState('') // Official website URL
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)

  useEffect(() => {
    if (editingProvider) {
      setName(editingProvider.name || '')
      setType(editingProvider.type || 'openai')
      setAvatar(editingProvider.avatar || '🤖')
      setAvatarType((editingProvider.avatar || '').startsWith('http') ? 'custom' : 'builtin')
      setRemark(editingProvider.remark || '')
      setOfficialUrl(editingProvider.officialUrl || '')
      setShowAvatarPicker(false)
    } else {
      // Reset to defaults
      setName('')
      setType('openai')
      setAvatar('🤖')
      setAvatarType('builtin')
      setAvatarUrl('')
      setRemark('')
      setOfficialUrl('')
      setShowAvatarPicker(false)
    }
  }, [editingProvider, isOpen])

  const handleResetAvatar = () => {
    setAvatar('🤖')
    setAvatarType('builtin')
    setAvatarUrl('')
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 检查文件类型和大小
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('图片大小不能超过2MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      setAvatarUrl(dataUrl)
      setAvatar(dataUrl)
      setAvatarType('custom')
      setShowAvatarPicker(false)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      alert('请输入服务商名称')
      return
    }

    const finalAvatar = avatarType === 'custom' ? avatarUrl : avatar

    if (editingProvider) {
      // 更新现有服务商
      onAdd({
        ...editingProvider,
        name: name.trim(),
        type,
        avatar: finalAvatar,
        remark: remark || undefined,
        officialUrl: officialUrl || undefined
      })
    } else {
      // 添加新服务商
      onAdd({
        name: name.trim(),
        type,
        avatar: finalAvatar,
        remark: remark || undefined,
        officialUrl: officialUrl || undefined
      })
    }

    handleClose()
  }

  const handleClose = () => {
    setShowAvatarPicker(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 标题栏 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid #e5e7eb'
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
            {editingProvider ? '编辑服务商' : '添加服务商'}
          </h3>
          <button
            onClick={handleClose}
            style={{
              padding: '4px',
              border: 'none',
              background: 'transparent',
              color: '#6b7280',
              cursor: 'pointer',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {/* 头像选择 */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: '500' }}>
              服务商头像
            </label>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              {/* 头像预览 */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  border: '2px solid #e5e7eb',
                  overflow: 'hidden'
                }}
              >
                {avatarType === 'custom' && avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span>{avatar}</span>
                )}
              </div>

              {/* 头像选择按钮 */}
              <div style={{ flex: 1 }}>
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginBottom: '8px'
                  }}
                >
                  {avatarType === 'builtin' ? '选择内置头像' : '更换头像'}
                </button>

                {showAvatarPicker && (
                  <div
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '16px',
                      backgroundColor: '#f9fafb'
                    }}
                  >
                    {/* 内置头像 */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                        内置头像
                      </label>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))',
                          gap: '8px'
                        }}
                      >
                        {BUILTIN_AVATARS.map((emoji, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setAvatar(emoji)
                              setAvatarType('builtin')
                              setAvatarUrl('')
                              setShowAvatarPicker(false)
                            }}
                            style={{
                              width: '44px',
                              height: '44px',
                              fontSize: '24px',
                              backgroundColor: 'white',
                              border: avatar === emoji ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease',
                              hover: avatar === emoji ? '#eff6ff' : 'transparent'
                            }}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 上传头像 */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                        上传头像
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <label
                          style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '12px',
                            border: '2px dashed #d1d5db',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            color: '#6b7280',
                            fontSize: '13px',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#3b82f6'
                            e.currentTarget.style.color = '#3b82f6'
                            e.currentTarget.style.backgroundColor = '#eff6ff'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#d1d5db'
                            e.currentTarget.style.color = '#6b7280'
                            e.currentTarget.style.backgroundColor = 'white'
                          }}
                        >
                          <Upload size={18} />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                          />
                          <span>点击上传图片</span>
                        </label>
                      </div>
                    </div>

                    {/* 重置头像 */}
                    <button
                      type="button"
                      onClick={handleResetAvatar}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#f3f4f6',
                        color: '#6b7280',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#e5e7eb'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6'
                      }}
                    >
                      <RefreshCw size={14} />
                      重置为默认
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowAvatarPicker(false)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: 'transparent',
                        color: '#6b7280',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '13px',
                        marginLeft: '8px'
                      }}
                    >
                      取消
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 服务商名称 */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              服务商名称 *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如: Azure OpenAI"
              required
              autoFocus={!editingProvider}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>

          {/* 服务商类型 */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              服务商类型
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              {PROVIDER_TYPES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* 服务商备注 */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              服务商备注
            </label>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="输入服务商的备注信息，如价格、特点等..."
              rows={3}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* 官方链接 */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              官方链接
            </label>
            <input
              type="url"
              value={officialUrl}
              onChange={(e) => setOfficialUrl(e.target.value)}
              placeholder="https://example.com"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>

          {/* 操作按钮 */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#fff',
                color: '#374151',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              取消
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              {editingProvider ? '保存' : '添加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
