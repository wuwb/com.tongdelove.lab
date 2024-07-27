import { Button } from '@/components/ui/Button'
import { useAppContext } from '@/contexts/AppContext'
import { ActionType } from '@/reducers/AppReducer'
import clsx from 'clsx'

export function Menu() {
  const {
    state: { displayNavigation },
    dispatch,
  } = useAppContext()
  return (
    <Button
      className={clsx('fixed left-2 top-2', {
        hidden: displayNavigation,
      })}
      onClick={() => {
        dispatch({
          type: ActionType.UPDATE,
          field: 'displayNavigation',
          value: true,
        })
      }}
    >
      显示
    </Button>
  )
}
