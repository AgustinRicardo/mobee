import { Skeleton } from "./ui/skeleton";

interface Props {
  hideInfo?: boolean;
}

export default function ListSkeleton({ hideInfo }: Props) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-1">
          <Skeleton className="w-20 h-28" />
          <Skeleton className="w-20 h-28" />
          <Skeleton className="w-20 h-28" />
          <Skeleton className="w-20 h-28" />
        </div>
        {!hideInfo && (
          <>
            <Skeleton className="w-48 h-8" />
            <Skeleton className="w-40 h-6" />
          </>
        )}
      </div>
    </>
  );
}
