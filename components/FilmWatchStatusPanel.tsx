"use client";
import AddToListIcon from "./icons/AddToListIcon";
import ToWatchIcon from "./icons/ToWatchIcon";
import AdditionalOptionsIcon from "./icons/AdditionalOptionsIcon";
import WatchedIcon from "./icons/WatchedIcon";
import { useEffect, useState } from "react";
import { DialogReview } from "./DialogReview";
import { Film } from "@/lib/interfaces";

interface Props {
  apiId: number;
  userId: string;
  film: Film;
}
export default function FilmWatchStatusPanel({ apiId, userId, film }: Props) {
  const [isWatched, setIsWatched] = useState<boolean>(false);
  const [toWatch, setToWatch] = useState<boolean>(false);
  const [filmId, setFilmId] = useState<string>("");

  useEffect(() => {
    fetch(
      "/api/filmStatus?" + new URLSearchParams({ apiId: String(apiId), userId })
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.watchStatus) {
          setIsWatched(data.watchStatus.watched);
          setToWatch(data.watchStatus.to_watch);
          setFilmId(data.watchStatus.film_id);
        }
      });
  }, []);

  return (
    <div className="user-input h-56 w-56 bg-beeBrownLight">
      <button
        className="flex flex-row"
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
          } hover:cursor-pointer w-8`}
        />
        <span>{isWatched ? "Watched" : "Not watched"}</span>
      </button>
      <button
        className="flex flex-row"
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
          } hover:cursor-pointer w-8`}
        />
        <span>{toWatch ? "Added to watchlist" : "Add to watchlist"}</span>
      </button>
      <DialogReview film={film} userId={userId} apiId={apiId} />
      <button className="flex flex-row">
        <AddToListIcon className="text-beeBrownBackground hover:cursor-pointer w-8" />
        <span>Add to list</span>
      </button>
      <AdditionalOptionsIcon className="text-beeBrownBackground hover:cursor-pointer w-8" />
    </div>
  );
}
