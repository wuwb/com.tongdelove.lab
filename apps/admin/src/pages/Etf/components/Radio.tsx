import React, { useCallback } from 'react'
import type { ChangeEvent } from 'react'
import { useStyles } from '../styles'

type IOnChange = (value: string) => void
type RadioProps = {
  name: string
  value: string
  label: string
  checked: boolean
  onChange: IOnChange
}

export function Radio({ name, value, label, checked, onChange }: RadioProps) {
  const { styles } = useStyles()
  const callback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        onChange(value)
      }
    },
    [onChange, value],
  )

  return (
    <label className={styles.radioLabel}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={callback}
      />
      <span>{label}</span>
    </label>
  )
}
