import React, { useCallback, useState } from 'react'
import type { ChangeEvent, InputHTMLAttributes } from 'react'
import useUpdateEffect from '../hooks/useUpdateEffect'

type IOnChange = (value: boolean) => void
type CheckBoxProps = Required<
  Pick<InputHTMLAttributes<HTMLInputElement>, 'checked'>
> & {
  onChange: IOnChange
}

export function CheckBox({ checked, onChange, ...rest }: CheckBoxProps) {
  const [state, setState] = useState<boolean>(checked)
  const callback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.checked
    setState(v)
  }, [])

  useUpdateEffect(() => {
    onChange(state)
  }, [state])

  return <input {...rest} type="checkbox" checked={state} onChange={callback} />
}
