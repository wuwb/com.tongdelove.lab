'use client'

import { Button } from "@/components/ui/Button";
import { useAppContext } from "@/contexts/AppContext";
import { ActionType } from "@/reducers/AppReducer";
import cn from 'clsx'

export default function Menu() {
  const {
    state: {
      displayNavigation,
    },
    dispatch
  } = useAppContext()
  return (
    <Button
      className={cn('fixed left-2 top-2',
        {
          'hidden': displayNavigation
        }
      )}
      onClick={() => {
        dispatch({
          type: ActionType.UPDATE,
          field: 'displayNavigation',
          value: true
        })
      }}>显示</Button>
  )
}
