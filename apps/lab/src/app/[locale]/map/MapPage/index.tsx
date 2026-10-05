import { Allotment } from 'allotment'
import 'allotment/dist/style.css'

export const MapPage = () => {
  return (
    <div>
      <div className="flex flex-row gap-2.5">
        <div>1</div>
        <div>2</div>
      </div>
      <div className="flex-1 pl-2.5">
        <Allotment>
          <Allotment.Pane minSize={512}>
            <div className="dark-scroll-bar rounded-2.5 bg-fgMain-950 !z-10 mr-2.5 h-[calc(100vh-96px)] grow overflow-y-auto overflow-x-hidden">
              1
            </div>
          </Allotment.Pane>
          <Allotment.Pane minSize={446} preferredSize={620}>
            <div w="full" mr="0.625rem">
              2
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  )
}

MapPage.displayName = 'MapPage'
