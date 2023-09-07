"use client";
import AddToListIcon from "./icons/AddToListIcon";
import ToWatchIcon from "./icons/ToWatchIcon";
import AdditionalOptionsIcon from "./icons/AdditionalOptionsIcon";
import WatchedIcon from "./icons/WatchedIcon";
import { useEffect, useState } from "react";
import { DialogReview } from "./DialogReview";
import { Film } from "@/lib/interfaces";
import AddReviewIcon from "./icons/AddReviewIcon";
import RatingPicker from "./RatingPicker";
import { DialogAddToList } from "./DialogAddToList";

interface Props {
  userId: string;
  film: Film;
}
export default function FilmWatchStatusPanel({ userId, film }: Props) {
  const [isWatched, setIsWatched] = useState<boolean>(false);
  const [toWatch, setToWatch] = useState<boolean>(false);
  const [filmId, setFilmId] = useState<string>("");
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    fetch(
      "/api/filmStatus?" +
        new URLSearchParams({ apiId: String(film.id), userId })
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.watchStatus) {
          setIsWatched(data.watchStatus.watched);
          setToWatch(data.watchStatus.to_watch);
          setFilmId(data.watchStatus.film_id);
        }
      });

    fetch("/api/film?" + new URLSearchParams({ apiId: String(film.id) }))
      .then((res) => res.json())
      .then((data) => {
        if (data.film.average_rating) {
          setAverageRating(data.film.average_rating);
        }
      });
    console.log(averageRating);
  }, []);

  return (
    <div className="user-input h-fit w-[300px] relative bottom-5 bg-beeBrownLight ">
      <div className="divide-y divide-beeBrownBackground flex flex-col gap-4">
        <div className="pt-5 pl-5 justify-center">
          <button
            className="flex flex-row"
            onClick={() => {
              fetch("/api/filmStatus", {
                method: "POST",
                body: JSON.stringify({ apiId: film.id, userId, isWatched }),
              });
              setIsWatched(!isWatched);
            }}
          >
            <WatchedIcon
              className={`${
                isWatched ? "text-beeYellow" : "text-beeBrownBackground"
              } hover:cursor-pointer w-8`}
            />
            <span className="pl-2">
              {isWatched ? "Watched" : "Not watched"}
            </span>
          </button>
        </div>
        <div className="pt-5 pl-5 justify-center">
          <button
            className="flex flex-row"
            onClick={() => {
              fetch("/api/filmStatus", {
                method: "POST",
                body: JSON.stringify({ apiId: film.id, userId, toWatch }),
              });
              setToWatch(!toWatch);
            }}
          >
            <ToWatchIcon
              className={`${
                toWatch ? "text-beeYellow" : "text-beeBrownBackground"
              } hover:cursor-pointer w-8`}
            />
            <span className="pl-2">
              {toWatch ? "Added to watchlist" : "Add to watchlist"}
            </span>
          </button>
        </div>
        <div className="pt-5 pl-5 justify-center">
          <DialogReview film={film} userId={userId}>
            <span className="flex flex-row hover:cursor-pointer">
              <AddReviewIcon className="text-beeBrownBackground hover:cursor-pointer w-8" />
              <span className="pl-2">Add review</span>
            </span>
          </DialogReview>
        </div>
        <div className="pt-5 pl-5 justify-center">
          <DialogAddToList apiId={film.id} userId={userId}>
            <span className="flex flex-row hover:cursor-pointer">
              <AddToListIcon className="text-beeBrownBackground hover:cursor-pointer w-8" />
              <span className="pl-2">Add to list</span>
            </span>
          </DialogAddToList>
        </div>
        <div className="pt-5 pb-5 justify-center">
          <div className="flex flex-col">
            <span className="pl-5"> Average Rating</span>
            <div className="flex flex-col items-center">
              <RatingPicker
                emptyIconColor="text-beeBrownBackground"
                readOnly={true}
                averageRating={averageRating}
              />
              <span>{averageRating}/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
