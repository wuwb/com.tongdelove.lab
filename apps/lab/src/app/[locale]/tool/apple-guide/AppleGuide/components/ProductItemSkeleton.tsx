import { Progress } from './Progress'
import { Skeleton } from './Skeleton'

export const ProductItemSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4 py-10 pl-8">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="mb-4 h-4 w-40" />

      <div>
        <Skeleton className="mb-4 h-4 w-16" />
        <div className="flex flex-col space-y-4">
          <div>
            <div className="flex items-end pt-1">
              <Skeleton className="h-3 w-24" />
            </div>
            <Progress v={0} max={1} />
          </div>
        </div>
      </div>

      <div>
        <Skeleton className="mb-4 h-4 w-16" />
        <div className="flex flex-col space-y-4">
          <div>
            <div className="flex items-end pt-1">
              <Skeleton className="h-3 w-24" />
            </div>
            <Progress v={0} max={1} />
          </div>
        </div>
      </div>

      <div>
        <Skeleton className="mb-4 h-4 w-16" />
        <div className="flex flex-col space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div className="flex items-end pt-1">
                <Skeleton className="h-3 w-24" />
              </div>
              <Progress v={0} max={1} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
