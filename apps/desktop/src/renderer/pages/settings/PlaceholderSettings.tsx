interface PlaceholderSettingsProps {
  title: string
}

export function PlaceholderSettings({ title }: PlaceholderSettingsProps) {
  return (
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>{title}</h2>
      <p style={{ fontSize: '16px', color: '#6b7280' }}>此功能正在开发中...</p>
    </div>
  )
}
