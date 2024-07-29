export const Progress = ({ v, max }: { v: number; max: number }) => {
  const p = Math.min(100, Math.round((v / max) * 100))
  return (
    <div className="mt-2 h-1 bg-neutral-100">
      <div className="bg-i-blue mt-2 h-1" style={{ width: p + '%' }} />
    </div>
  )
}
