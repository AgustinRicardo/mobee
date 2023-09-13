"use client";

import { useRouter } from "next/navigation";
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
import { FilmSkeleton } from "./Skeleton";

interface Props {
  apiId: number;
  userId: string;
  className?: string;
}

export default function FilmPoster({ apiId, userId, className }: Props) {
  const router = useRouter();
  const [isWatched, setIsWatched] = useState<boolean>(false);
  const [toWatch, setToWatch] = useState<boolean>(false);
  const [posterPath, setPosterPath] = useState<string>();

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
        }
      });
  }, []);

  return posterPath ? (
    <>
      <div className="group">
        <div className="hidden flex-col justify-around px-2 py-2 gap-0.5 group-hover:flex absolute group-hover:bg-beeBrownLight/90 rounded-tl-md rounded-br-md ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    fetch("/api/filmStatus", {
                      method: "POST",
                      body: JSON.stringify({ apiId, userId, isWatched }),
                    });
                    setIsWatched(!isWatched);
                  }}
                >
                  <WatchedIcon
                    className={`${
                      isWatched ? "text-beeYellow" : "text-beeBrownBackground"
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
          </TooltipProvider>
        </div>

        <img
          onClick={() => {
            router.push(`/film_details/${String(apiId)}`);
          }}
          className={className}
          src={
            posterPath && `https://image.tmdb.org/t/p/original/${posterPath}`
          }
          alt=""
        />
      </div>
    </>
  ) : (
    <FilmSkeleton className="w-56 h-80" />
  );
}
