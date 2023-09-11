import { Skeleton } from "@/components/ui/skeleton"
 
export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-[138px] w-24" />
    </div>
  )
}