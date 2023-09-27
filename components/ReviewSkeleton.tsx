import { Skeleton } from "./ui/skeleton";

interface Props {
  hideMovie?: boolean;
}

export default function ReviewSkeleton({ hideMovie }: Props) {
  return (
    <>
      <div className="flex flex-row items-start gap-4">
        {!hideMovie && <Skeleton className="w-20 h-28" />}
        <div className="flex flex-col gap-1">
          {!hideMovie && <Skeleton className="w-48 h-8" />}
          <Skeleton className="w-40 h-6" />
          <Skeleton className="w-80 h-28" />
        </div>
      </div>
    </>
  );
}
