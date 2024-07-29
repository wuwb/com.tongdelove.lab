import { Button } from '@/components/ui/Button'
import { useAppContext } from '@/contexts/AppContext'
import { ActionType } from '@/reducers/AppReducer'

export const MenuBar = () => {
  const {
    state: { displayNavigation },
    dispatch,
  } = useAppContext()

  return (
    <div className="flex space-x-3">
      <Button variant="outline" className="flex-1">
        新建对话
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          dispatch({
            type: ActionType.UPDATE,
            field: 'displayNavigation',
            value: false,
          })
        }}
      >
        切换
      </Button>
    </div>
  )
}
