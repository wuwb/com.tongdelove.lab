import { useState } from 'react'
import { useEvent } from './useEvent'

export function useSet<K>(initialValue?: Iterable<K>) {
  const getInitValue = () => new Set(initialValue)
  const [set, setSet] = useState<Set<K>>(getInitValue)

  const add = useEvent((key: K) => {
    if (set.has(key)) {
      return
    }
    setSet((prevSet) => {
      const temp = new Set(prevSet)
      temp.add(key)
      return temp
    })
  })

  const remove = useEvent((key: K) => {
    if (!set.has(key)) {
      return
    }
    setSet((prevSet) => {
      const temp = new Set(prevSet)
      temp.delete(key)
      return temp
    })
  })

  const reset = useEvent(() => setSet(getInitValue()))

  return [
    set,
    {
      add,
      remove,
      reset,
    },
  ] as const
}

export default useSet
