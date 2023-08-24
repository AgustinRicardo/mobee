"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddReviewIcon from "./icons/AddReviewIcon";
import { Film } from "@/lib/interfaces";
import { Checkbox } from "./ui/checkbox";
import { CalendarForm } from "./CalendarForm";
import { FormEvent, FormEventHandler, useState } from "react";
import RatingPicker from "./RatingPicker";
import { format } from "date-fns";
import { DialogClose } from "@radix-ui/react-dialog";

interface Props {
  film: Film;
  userId: string;
  filmId: string;
}

export function DialogReview({ film, userId, filmId }: Props) {
  const [checkedDateWatched, setCheckDateWatched] = useState<boolean>(false);
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [date, setDate] = useState<Date>();
  const [review, setReview] = useState<string>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    console.log("hola");
    e.preventDefault();
    if (ratingValue === null && review === null) {
    } else {
      const reviewData = {
        userId,
        filmId,
        date,
        review,
        ratingValue,
      };
      try {
        await fetch("/api/review", {
          method: "POST",
          body: JSON.stringify(reviewData),
        });
      } catch (e) {
        throw e;
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex flex-row">
          <AddReviewIcon className="text-beeBrownBackground hover:cursor-pointer w-8" />
          <span>Add review</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] h-96 border-none">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <img
              className="my-5 rounded-md border-2 border-beeBrownLight w-36 h-fit shadow-md "
              src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
              alt={film.title}
            />
          </div>
          <div className="flex flex-col p-5 w-full gap-3">
            <div className="flex flex-col">
              <p className="font-switzer text-sm text-beeBrownLight">
                I watched
              </p>

              <div className="flex flex-row items-baseline">
                <h1 className="pr-3 font-lora font-bold text-2xl">
                  {film.title}
                </h1>
                <p className="font-switzer font-light text-s text-beeBrownLight ">
                  {film.release_date.slice(0, 4)}
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row gap-2 items-center h-10">
                <Checkbox
                  id="watchedOn"
                  className="bg-beeBeig"
                  onCheckedChange={() => {
                    setCheckDateWatched(!checkedDateWatched);
                  }}
                />
                <label
                  htmlFor="watchedOn"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {checkedDateWatched ? "Watched on" : "Add to diary?"}
                </label>
                {checkedDateWatched && (
                  <CalendarForm date={date} setDate={setDate} />
                )}
                <span>{date && format(date, "PPP")}</span>
              </div>
              <div>
                <textarea
                  className=" bg-beeBeig text-beeBrownBackground w-96 h-28 rounded-sm placeholder:text-beeBrownBackground placeholder:opacity-50 p-1"
                  placeholder="Write a review..."
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="flex flex-row items-end">
                <div className="flex flex-col gap-2">
                  <span>Rating {ratingValue}</span>
                  <RatingPicker setRatingValue={setRatingValue} />
                </div>
                <DialogClose asChild>
                  <button
                    className="bg-beeYellow rounded-sm text-beeBrownBackground px-3 py-1 ml-auto"
                    type="submit"
                  >
                    Save
                  </button>
                </DialogClose>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
