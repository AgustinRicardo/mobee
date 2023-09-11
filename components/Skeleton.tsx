import { Skeleton } from "@/components/ui/skeleton"
 
interface Props {
  className: string;
}

export function FilmSkeleton({className}: Props) {
  return (
    <div>
      <Skeleton className={className} />
    </div>
  )
}