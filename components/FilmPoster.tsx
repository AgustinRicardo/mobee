"use client";

import { useRouter } from "next/navigation";
import WatchedIcon from "./icons/WatchedIcon";
import ToWatchIcon from "./icons/ToWatchIcon";
import AdditionalOptionsIcon from "./icons/AdditionalOptionsIcon";
import AddToListIcon from "./icons/AddToListIcon";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  src: string;
  alt: string;
  id: string;
  userId: string;
}

export default function FilmPoster({ src, alt, id, userId }: Props) {
  const router = useRouter();
  const [isWatched, setIsWatched] = useState<boolean>(false);
  const [toWatch, setToWatch] = useState<boolean>(false);

  useEffect(() => {
    fetch(
      "/api/filmStatus?" + new URLSearchParams({ apiId: String(id), userId })
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.watchStatus) {
          setIsWatched(data.watchStatus.watched);
          setToWatch(data.watchStatus.to_watch);
        }
      });
  }, []);

  return (
    <>
      <div className="flex flex-row group">
        <div className="hidden flex-col justify-around px-2 py-8 gap-0.5 h-1/5 group-hover:flex absolute group-hover:bg-beeBrownLight/90 rounded-tl-md rounded-br-md border-beeBrownLight border-t border-l ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={() => {
                    console.log(id);
                    fetch("/api/filmStatus", {
                      method: "POST",
                      body: JSON.stringify({ apiId: id, userId, isWatched }),
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
              <TooltipTrigger>
                <button
                  onClick={() => {
                    fetch("/api/filmStatus", {
                      method: "POST",
                      body: JSON.stringify({ apiId: id, userId, toWatch }),
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
          </TooltipProvider>

          <button>
            <AddToListIcon className="text-beeBrownBackground hover:cursor-pointer w-6" />
          </button>
          <button>
            <AdditionalOptionsIcon className="text-beeBrownBackground hover:cursor-pointer w-6" />
          </button>
        </div>

        <img
          onClick={() => {
            router.push(`/film_details/${id}`);
          }}
          className="rounded-md border-2 border-beeBrownLight min-w-full"
          src={src}
          alt={alt}
        />
      </div>
    </>
  );
}
