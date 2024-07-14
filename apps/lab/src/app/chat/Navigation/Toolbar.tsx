import { Button } from '@/components/ui/Button'
import { useAppContext } from '@/contexts/AppContext'
import { ActionType } from '@/reducers/AppReducer'
import { TbSun, TbMoon } from 'react-icons/tb'
import clsx from 'clsx'

export default function Toolbar() {
  const {
    state: { displayNavigation, themeMode },
    dispatch,
  } = useAppContext()

  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2">
      <Button
        className={clsx({
          light: themeMode === 'light',
          dark: themeMode === 'dark',
        })}
        onClick={() => {
          dispatch({
            type: ActionType.UPDATE,
            field: 'themeMode',
            value: themeMode === 'light' ? 'dark' : 'light',
          })
        }}
      >
        {themeMode === 'light' ? <TbSun /> : null}
        {themeMode === 'dark' ? <TbMoon /> : null}
      </Button>
      <Button variant="outline">切换</Button>
    </div>
  )
}
