/* eslint-disable jsx-a11y/alt-text */
"use client";

import { usePathname, useRouter } from "next/navigation";
import WatchedIcon from "./icons/WatchedIcon";
import ToWatchIcon from "./icons/ToWatchIcon";
import AddToListIcon from "./icons/AddToListIcon";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DialogAddToList } from "./DialogAddToList";
import { Skeleton } from "./ui/skeleton";
import DeleteIcon from "./icons/DeleteIcon";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";

interface Props {
  apiId: number;
  userId: string;
  className?: string;
  canDelete?: boolean;
  listId?: string;
}

export default function FilmPoster({
  apiId,
  userId,
  className,
  canDelete = false,
  listId,
}: Props) {
  const router = useRouter();
  const [isWatched, setIsWatched] = useState<boolean>(false);
  const [toWatch, setToWatch] = useState<boolean>(false);
  const [posterPath, setPosterPath] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const pathname = usePathname();

  useEffect(() => {
    fetch(
      "/api/filmStatus?" + new URLSearchParams({ apiId: String(apiId), userId })
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.watchStatus) {
          setIsWatched(data.watchStatus.watched);
          setToWatch(data.watchStatus.to_watch);
        }
      });
    const url = `https://api.themoviedb.org/3/movie/${apiId}?language=en-US&append_to_response=credits`;
    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.poster_path) {
          setPosterPath(data.poster_path);
        } else {
          setPosterPath("");
        }
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        pathname.includes("/film_details") ? (
          <Skeleton className="w-24 h-36" />
        ) : (
          <Skeleton className="w-48 h-64" />
        )
      ) : (
        posterPath && (
          <div className={`group`}>
            <div className="hidden group-hover:flex-col justify-around px-2 py-2 gap-0.5 group-hover:flex absolute group-hover:bg-beeBrownLight/90 rounded-tl-md rounded-br-md">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        fetch("/api/filmStatus", {
                          method: "POST",
                          body: JSON.stringify({ apiId, userId, isWatched }),
                        });
                        if (isWatched) {
                          toast({
                            title: "Film removed from your watched films",
                          });
                        } else {
                          toast({
                            title: "Film added to your watched films",
                          });
                        }
                        setIsWatched(!isWatched);
                      }}
                    >
                      <WatchedIcon
                        className={`${
                          isWatched
                            ? "text-beeYellow"
                            : "text-beeBrownBackground"
                        } hover:cursor-pointer w-6`}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-beeBrownBackground text-beeBeig border-none text-xs">
                    <p>{isWatched ? "Watched" : "Not watched"}</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        fetch("/api/filmStatus", {
                          method: "POST",
                          body: JSON.stringify({ apiId, userId, toWatch }),
                        });
                        if (toWatch) {
                          toast({
                            title: "Film removed from your watchlist",
                          });
                        } else {
                          toast({ title: "Film added to your watchlist" });
                        }
                        setToWatch(!toWatch);
                      }}
                    >
                      <ToWatchIcon
                        className={`${
                          toWatch ? "text-beeYellow" : "text-beeBrownBackground"
                        } hover:cursor-pointer w-6`}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-beeBrownBackground text-beeBeig border-none text-xs">
                    <p>{toWatch ? "Added to watchlist" : "Not in watchlist"}</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <DialogAddToList apiId={apiId} userId={userId}>
                    <TooltipTrigger>
                      <AddToListIcon className="text-beeBrownBackground hover:cursor-pointer w-6" />
                    </TooltipTrigger>
                  </DialogAddToList>
                  <TooltipContent className="bg-beeBrownBackground text-beeBeig border-none text-xs">
                    <p>Add film to a list</p>
                  </TooltipContent>
                </Tooltip>
                {canDelete && (
                  <Tooltip>
                    <TooltipTrigger>
                      <DeleteIcon
                        className="w-6 text-beeBrownBackground hover:cursor-pointer "
                        onClick={(e) => {
                          e.stopPropagation();
                          toast({
                            title: `Are you sure you want to delete the review?`,
                            action: (
                              <ToastAction
                                className="hover:bg-beeRed"
                                altText="Delete"
                                onClick={() => {
                                  fetch(
                                    `/api/list/filmOnList?listId=${listId}&apiId=${apiId}`,
                                    {
                                      method: "DELETE",
                                    }
                                  )
                                    .then(() => {
                                      location.reload();
                                    })
                                    .catch((error) => {
                                      error;
                                    });
                                }}
                              >
                                Delete
                              </ToastAction>
                            ),
                          });
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-beeBrownBackground text-beeBeig border-none text-xs">
                      <p>Delete film from list</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </TooltipProvider>
            </div>

            <img
              onClick={() => {
                router.push(`/film_details/${String(apiId)}`);
              }}
              className={className}
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            />
          </div>
        )
      )}
    </>
  );
}
