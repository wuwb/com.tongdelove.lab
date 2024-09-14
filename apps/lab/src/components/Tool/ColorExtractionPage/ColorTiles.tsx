import { memo } from 'react'

export const ColorTiles = memo(
  ({ themeColors }: { themeColors: [number, number, number][] }) => (
    <div className="flex flex-wrap">
      {themeColors.map((color) => {
        return (
          <div>
            <div
              key={Math.random()}
              className="h-[50px] w-[100px] rounded"
              style={{
                backgroundColor: `rgb(${color.join(',')}`,
              }}
            />
          </div>
        )
      })}
    </div>
  )
)

ColorTiles.displayName = 'ColorTiles'
