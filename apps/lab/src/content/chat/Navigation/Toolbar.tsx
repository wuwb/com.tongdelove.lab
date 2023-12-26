import { Button } from "@/components/ui/Button"
import { useAppContext } from "@/contexts/AppContext"
import { ActionType } from "@/reducers/AppReducer"
import { IconSun, IconMoon } from "@tabler/icons-react"
import cn from 'clsx'

export default function Toolbar() {
  const {
    state: { displayNavigation, themeMode },
    dispatch,
  } = useAppContext()

  return (
    <div className="absolute bottom-0 left-0 right-0 flex p-2 justify-between">
      <Button
        variant='text'
        className={cn({
          'light': themeMode === 'light',
          'dark': themeMode === 'dark',
        })}
        onClick={() => {
          dispatch({
            type: ActionType.UPDATE,
            field: 'themeMode',
            value: themeMode === 'light' ? 'dark' : 'light'
          })
        }}
      >{
          themeMode === 'light' ? <IconSun /> : null
        }
        {
          themeMode === 'dark' ? <IconMoon /> : null
        }
      </Button>
      <Button variant='outline' >
        切换
      </Button>

    </div>
  )
}
