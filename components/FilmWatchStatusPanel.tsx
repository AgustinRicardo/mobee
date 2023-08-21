"use client";
import AddToListIcon from "./icons/AddToListIcon";
import ToWatchIcon from "./icons/ToWatchIcon";
import AdditionalOptionsIcon from "./icons/AdditionalOptionsIcon";
import WatchedIcon from "./icons/WatchedIcon";
import { useEffect, useState } from "react";

interface Props {
  apiId: number;
  userId: string;
}
export default function FilmWatchStatusPanel({ apiId, userId }: Props) {
  const [isWatched, setIsWatched] = useState<boolean>(false);

  useEffect(() => {
    fetch(
      "/api/filmStatus?" + new URLSearchParams({ apiId: String(apiId), userId })
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsWatched(data.watchStatus.watched);
      });
  }, []);

  return (
    <div className="user-input h-56 w-56 bg-beeBrownLight">
      <button
        className="flex flex-row"
        onClick={() => {
          fetch("/api/filmStatus", {
            method: "POST",
            body: JSON.stringify({ apiId, userId }),
          });
          setIsWatched(!isWatched);
        }}
      >
        <WatchedIcon
          className={`${
            isWatched ? "text-beeYellow" : "text-beeBrownBackground"
          } hover:cursor-pointer w-8`}
        />
        <span>{isWatched ? "Watched" : "Not watched"}</span>
      </button>
      <button className="flex flex-row">
        <ToWatchIcon className="text-beeBrownBackground hover:cursor-pointer w-8" />
        <span>Add to watchilist</span>
      </button>
      <button className="flex flex-row">
        <AddToListIcon className="text-beeBrownBackground hover:cursor-pointer w-8" />
        <span>Add to list</span>
      </button>
      <AdditionalOptionsIcon className="text-beeBrownBackground hover:cursor-pointer w-8" />
    </div>
  );
}
