import { useState } from 'react'
import { XIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { ModelType, ModelConfig } from '@/shared/ipc'

interface AddModelDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (model: ModelConfig) => void
  editingModel?: ModelConfig | null
}

const MODEL_TYPES: { value: ModelType; label: string }[] = [
  { value: 'vision', label: '视觉' },
  { value: 'websearch', label: '联网' },
  { value: 'reasoning', label: '推理' },
  { value: 'tools', label: '工具' },
  { value: 'reranking', label: '重排' },
  { value: 'embedding', label: '嵌入' }
]

const COMMON_CURRENCIES = ['USD', 'CNY', 'EUR', 'GBP', 'JPY', 'KRW']

export function AddModelDialog({ isOpen, onClose, onAdd, editingModel }: AddModelDialogProps) {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [groupId, setGroupId] = useState('')
  const [types, setTypes] = useState<ModelType[]>([])
  const [supportsStreaming, setSupportsStreaming] = useState(true)
  const [currency, setCurrency] = useState('USD')
  const [inputPrice, setInputPrice] = useState<number | undefined>(undefined)
  const [outputPrice, setOutputPrice] = useState<number | undefined>(undefined)
  const [showAdvanced, setShowAdvanced] = useState(false)

  useState(() => {
    if (editingModel) {
      setId(editingModel.id)
      setName(editingModel.name)
      setGroupId(editingModel.groupId)
      setTypes(editingModel.types)
      setSupportsStreaming(editingModel.supportsStreaming)
      setCurrency(editingModel.currency || 'USD')
      setInputPrice(editingModel.inputPrice)
      setOutputPrice(editingModel.outputPrice)
      setShowAdvanced(true)
    } else {
      setId('')
      setName('')
      setGroupId('default')
      setTypes([])
      setSupportsStreaming(true)
      setCurrency('USD')
      setInputPrice(undefined)
      setOutputPrice(undefined)
      setShowAdvanced(false)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!id.trim()) {
      alert('请输入模型ID')
      return
    }

    if (!name.trim()) {
      alert('请输入模型名称')
      return
    }

    onAdd({
      id: id.trim(),
      name: name.trim(),
      groupId: groupId.trim() || 'default',
      types,
      supportsStreaming,
      currency,
      inputPrice,
      outputPrice
    })

    handleClose()
  }

  const handleClose = () => {
    setId('')
    setName('')
    setGroupId('default')
    setTypes([])
    setSupportsStreaming(true)
    setCurrency('USD')
    setInputPrice(undefined)
    setOutputPrice(undefined)
    setShowAdvanced(false)
    onClose()
  }

  const toggleType = (type: ModelType) => {
    setTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
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
            {editingModel ? '编辑模型' : '添加模型'}
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
            <XIcon size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {/* 模型ID */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}
            >
              模型ID *
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="例如: gpt-4, claude-3-opus-20240229"
              required
              autoFocus={!editingModel}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>

          {/* 模型名称 */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}
            >
              模型名称 *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如: GPT-4, Claude 3 Opus"
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>

          {/* 分组名称 */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}
            >
              分组名称 *
            </label>
            <input
              type="text"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              placeholder="例如: GPT系列, Claude系列"
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>

          {/* 高级配置 */}
          <div
            style={{
              marginBottom: '20px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                backgroundColor: '#f9fafb',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
              }}
            >
              <span>高级配置</span>
              {showAdvanced ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
            </button>

            {showAdvanced && (
              <div style={{ padding: '16px' }}>
                {/* 模型类型 */}
                <div style={{ marginBottom: '20px' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    模型类型
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {MODEL_TYPES.map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => toggleType(value)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: types.includes(value) ? '#3b82f6' : 'white',
                          color: types.includes(value) ? 'white' : '#374151',
                          border: types.includes(value) ? 'none' : '1px solid #e5e7eb',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!types.includes(value)) {
                            e.currentTarget.style.borderColor = '#3b82f6'
                            e.currentTarget.style.color = '#3b82f6'
                            e.currentTarget.style.backgroundColor = '#eff6ff'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!types.includes(value)) {
                            e.currentTarget.style.borderColor = '#e5e7eb'
                            e.currentTarget.style.color = '#374151'
                            e.currentTarget.style.backgroundColor = 'white'
                          }
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 支持增量输出 */}
                <div style={{ marginBottom: '20px' }}>
                  <label
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  >
                    <input
                      type="checkbox"
                      checked={supportsStreaming}
                      onChange={(e) => setSupportsStreaming(e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '14px' }}>支持增量文本输出</span>
                  </label>
                </div>

                {/* 货币 */}
                <div style={{ marginBottom: '20px' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    模型币种
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
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
                    {COMMON_CURRENCIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 输入价格 */}
                <div style={{ marginBottom: '20px' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    模型输入价格（每百万Token）
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={inputPrice || ''}
                    onChange={(e) =>
                      setInputPrice(e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                    placeholder="例如: 5.00"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                {/* 输出价格 */}
                <div style={{ marginBottom: '0' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    模型输出价格（每百万Token）
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={outputPrice || ''}
                    onChange={(e) =>
                      setOutputPrice(e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                    placeholder="例如: 15.00"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
            )}
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
              {editingModel ? '保存' : '添加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
