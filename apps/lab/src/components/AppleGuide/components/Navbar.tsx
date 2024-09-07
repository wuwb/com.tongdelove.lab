import { DataType } from '@/client'
import { cn } from '@tongdelove/ui'
import { useTranslation } from '@/i18n'

export const Navbar = ({
  data,
  selected,
  setCategory,
}: {
  data?: DataType
  selected: number
  setCategory: (category: number) => void
}) => {
  const { t } = useTranslation()

  return (
    <div className="fixed bottom-0 h-32 w-full bg-gradient-to-t from-white to-white/0">
      <div className="absolute bottom-11 left-0 right-0 m-auto grid place-content-center">
        {data && (
          <div className="w-70 relative box-content h-9 rounded-full border border-neutral-200 bg-neutral-100 p-1 duration-300 ease-in-out animate-in fade-in slide-in-from-bottom fill-mode-backwards">
            <div className="relative w-full">
              <div
                className={cn(
                  'w-17 absolute h-9 rounded-full bg-neutral-900 transition-all duration-300 ease-out',
                  `left-${selected}-4`
                )}
              ></div>
            </div>
            <div className="absolute left-1 top-1 flex text-sm font-semibold">
              {data.data.map((item, index) => (
                <div
                  onClick={() => setCategory(index)}
                  key={item.contentClass}
                  className={cn(
                    'w-17 flex items-center justify-center leading-9 transition-all ease-in',
                    { 'text-white': selected === index }
                  )}
                >
                  {t(item.name)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
