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

interface Props {
  film: Film;
}

export function DialongReview({ film }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex flex-row">
          <AddReviewIcon className="text-beeBrownBackground hover:cursor-pointer w-8" />
          <span>Add review</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] h-96">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <img
              className="my-5 rounded-md border-2 border-beeBrownLight min-w-full shadow-md h-2/5"
              src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
              alt={film.title}
            />
          </div>
          <div className="flex flex-col p-5">
            <div className="flex flex-row">
              <p className="font-switzer text-sm text-beeBrownLight">
                I watched
              </p>
            </div>

            <div className="flex flex-row">
              <h1 className="pr-3 font-lora font-bold text-2xl">
                {film.title}
              </h1>
              <p className="font-switzer font-light text-s text-beeBrownLight">
                {film.release_date.slice(0, 4)}
              </p>
            </div>
            <div className="flex flex-row gap-5 py-3">
              <div className="flex gap-2">
                <Checkbox id="watchedOn" className="bg-beeBeig" />
                <label
                  htmlFor="watchedOn"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Watched on
                </label>
                <CalendarForm></CalendarForm>
              </div>

              <div className="flex gap-2">
                <Checkbox id="watchedBefore" className="bg-beeBeig" />
                <label
                  htmlFor="watchedBefore"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I've watched this film before
                </label>
              </div>
            </div>
            <div>
              <textarea className="w-full bg-beeBeig text-beeBrownBackground"></textarea>
            </div>
          </div>
          
        </div>
        
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
