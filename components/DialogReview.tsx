"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddReviewIcon from "./icons/AddReviewIcon";
import { Film, Review } from "@/lib/interfaces";
import { Checkbox } from "./ui/checkbox";
import { CalendarForm } from "./CalendarForm";
import {
  Children,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import RatingPicker from "./RatingPicker";
import { DialogClose } from "@radix-ui/react-dialog";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";

interface Props {
  film: Film;
  userId: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  setFilmToReview?: Dispatch<SetStateAction<Film | null>>;
  isEditing?: boolean;
  reviewFromDb?: Review;
}

export function DialogReview({
  film,
  userId,
  children,
  defaultOpen,
  setFilmToReview,
  isEditing = false,
  reviewFromDb,
}: Props) {
  const { toast } = useToast();
  const [checkedDateWatched, setCheckDateWatched] = useState<boolean>(
    isEditing && reviewFromDb?.watched_at! ? true : false
  );
  const [ratingValue, setRatingValue] = useState<number | null>(
    isEditing ? reviewFromDb?.rating! : null
  );
  const [date, setDate] = useState<Date | undefined>(
    isEditing ? reviewFromDb?.watched_at! : undefined
  );
  const [review, setReview] = useState<string>(
    isEditing ? reviewFromDb?.review_description! : ""
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (ratingValue === null && review === "") {
      toast({
        title: "No rating nor review",
        description: "Provide at least a rating or a written review",
        variant: "destructive",
      });
    } else {
      const reviewDataToPost = {
        userId,
        apiId: film.id,
        date,
        review,
        ratingValue,
      };
      const reviewDataToPut = {
        id: reviewFromDb?.id,
        date,
        review,
        ratingValue,
      };
      try {
        if (isEditing) {
          await fetch("/api/review", {
            method: "PUT",
            body: JSON.stringify(reviewDataToPut),
          });
        } else {
          await fetch("/api/review", {
            method: "POST",
            body: JSON.stringify(reviewDataToPost),
          });
        }
      } catch (e) {
        throw e;
      } finally {
        location.reload();
        toast({
          title: isEditing
            ? "Review edited successfully"
            : "Review added successfully",
        });
      }
    }
  };

  return (
    <>
      <Dialog
        onOpenChange={() => {
          setCheckDateWatched(
            isEditing && reviewFromDb?.watched_at! ? true : false
          );
          setDate(isEditing ? reviewFromDb?.watched_at! : undefined);
          setRatingValue(isEditing ? reviewFromDb?.rating! : null);
          setReview(isEditing ? reviewFromDb?.review_description! : "");
          if (setFilmToReview) {
            setFilmToReview(null);
          }
        }}
        defaultOpen={defaultOpen}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-2xl max-h-fit border-none">
          <div className="flex flex-row font-switzer font-light">
            <div className="flex flex-col">
              <img
                className="my-5 rounded-md border-2 border-beeBrownLight w-36 h-fit shadow-md "
                src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                alt={film.title}
              />
            </div>
            <div className="flex flex-col p-5 w-full gap-3">
              <div className="flex flex-col">
                <p className="text-sm text-beeBrownLight">I watched</p>

                <h1 className="pr-3 font-lora font-bold text-2xl">
                  {film.title}
                  <span className="pl-2 font-switzer font-light text-sm text-beeBrownLight ">
                    {film.release_date.slice(0, 4)}
                  </span>
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-1 items-center h-10">
                  <Checkbox
                    id="watchedOn"
                    className="bg-beeBeig data-[state=checked]:text-beeBrownBackground"
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
                  <div className="flex flex-col">
                    <span>Rating</span>
                    <RatingPicker
                      emptyIconColor="text-beeBrownLight"
                      setRatingValue={setRatingValue}
                      ratingValue={ratingValue}
                    />
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
      <Toaster />
    </>
  );
}
