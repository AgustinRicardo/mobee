"use client";
import AddToListIcon from "./icons/AddToListIcon";
import ToWatchIcon from "./icons/ToWatchIcon";
import WatchedIcon from "./icons/WatchedIcon";
import { useEffect, useState } from "react";
import { DialogReview } from "./DialogReview";
import { Film } from "@/lib/interfaces";
import AddReviewIcon from "./icons/AddReviewIcon";
import RatingPicker from "./RatingPicker";
import { DialogAddToList } from "./DialogAddToList";
import { toast } from "./ui/use-toast";

interface Props {
  userId: string;
  film: Film;
}
export default function FilmWatchStatusPanel({ userId, film }: Props) {
  const [isWatched, setIsWatched] = useState<boolean>(false);
  const [toWatch, setToWatch] = useState<boolean>(false);
  const [filmId, setFilmId] = useState<string>("");
  const [averageRating, setAverageRating] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);

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
      .then(({ film }) => {
        if (film) {
          setAverageRating(film.average_rating);

          setIsLoading(false);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="user-input h-fit w-64  bg-beeBrownLight rounded-md">
      <div className="flex flex-col pt-2 pb-2 gap-2">
        <div className="flex flex-row pl-5">
          <button
            className="flex flex-row items-center"
            onClick={() => {
              fetch("/api/filmStatus", {
                method: "POST",
                body: JSON.stringify({ apiId: film.id, userId, isWatched }),
              });
              if (isWatched) {
                toast({ title: "Film removed from your watched films" });
              } else {
                toast({ title: "Film added to your watched films" });
              }

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
        <hr className="border-beeBrownBackground" />
        <div className="flex flex-row pl-5">
          <button
            className="flex flex-row items-center"
            onClick={() => {
              fetch("/api/filmStatus", {
                method: "POST",
                body: JSON.stringify({ apiId: film.id, userId, toWatch }),
              });
              if (toWatch) {
                toast({ title: "Film removed from your watchlist" });
              } else {
                toast({ title: "Film added to your watchlist" });
              }
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
        <hr className="border-beeBrownBackground" />
        <div className="flex flex-row pl-5">
          <DialogReview film={film} userId={userId}>
            <span className="flex flex-row hover:cursor-pointer items-center">
              <AddReviewIcon className="text-beeBrownBackground hover:cursor-pointer w-8" />
              <span className="pl-2">Add review</span>
            </span>
          </DialogReview>
        </div>
        <hr className="border-beeBrownBackground" />
        <div className="flex flex-row pl-5">
          <DialogAddToList apiId={film.id} userId={userId}>
            <span className="flex flex-row hover:cursor-pointer items-center">
              <AddToListIcon className="text-beeBrownBackground hover:cursor-pointer w-8" />
              <span className="pl-2">Add to list</span>
            </span>
          </DialogAddToList>
        </div>
        <hr className="border-beeBrownBackground" />
        <div className="flex flex-col">
          <span className="pl-5">Average Rating</span>
          <div className="flex flex-col items-center py-2">
            {isLoading ? (
              <>
                <RatingPicker
                  emptyIconColor="text-beeBrownBackground"
                  readOnly={true}
                  averageRating={0}
                />
                <div className="h-6 w-full"></div>
              </>
            ) : averageRating !== 0 ? (
              <>
                <RatingPicker
                  emptyIconColor="text-beeBrownBackground"
                  readOnly={true}
                  averageRating={averageRating}
                />
                <span>{`${averageRating?.toFixed(2)}/5`}</span>
              </>
            ) : (
              <span className="py-2">No rating available</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
