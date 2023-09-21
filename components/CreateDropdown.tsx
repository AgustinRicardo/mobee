import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import DropdownIcon from "./icons/DropdownIcon";
import { FormEventHandler, useEffect, useState } from "react";
import FilmsSearchBar from "./FilmsSearchBar";
import { Film } from "@/lib/interfaces";
import RemoveIcon from "./icons/RemoveIcon";
import { DialogClose } from "@radix-ui/react-dialog";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { DialogReview } from "./DialogReview";
import { useRouter } from "next/navigation";
import AddReviewIcon from "./icons/AddReviewIcon";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  userId: string;
}

export default function CreateDropdown({ userId }: Props) {
  const { toast } = useToast();
  const [filmsOnNewList, setFilmsOnNewList] = useState<Film[]>([]);
  const [listTitle, setListTitle] = useState<string>("");
  const [listDescription, setListDescription] = useState<string>("");
  const [filmToReview, setFilmToReview] = useState<Film | null>(null);

  const router = useRouter();

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const filmIds = filmsOnNewList.map((film) => film.id);
    const listData = { listTitle, listDescription, filmIds, userId };
    if (!filmIds.length || listTitle === "") {
      if (!filmIds.length) {
        toast({
          variant: "destructive",
          title: "No films added",
          description: "Add at least one film to the list",
        });
      }
      if (listTitle === "") {
        toast({
          variant: "destructive",
          title: "No title provided",
          description: "Set a title for the list",
        });
      }
    } else {
      await fetch("/api/my_profile/lists", {
        method: "POST",
        body: JSON.stringify(listData),
      })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          location.reload();
          toast({
            title: "New list created successfully",
          });
        });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-beeYellow rounded-md flex flex-row items-center px-2 py-1 text-beeBrownBackground">
          Create <AddReviewIcon className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-beeBrownLight border-none text-beeBeig p-0 flex-col flex">
          {filmToReview ? (
            <DialogReview
              setFilmToReview={setFilmToReview}
              film={filmToReview}
              userId={userId}
              defaultOpen={true}
            >
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-beeBrownBackground data-[highlighted]:bg-beeBrownLightDarker data-[highlighted]:text-beeBeig hover:cursor-pointer rounded-none"
              >
                New review
              </DropdownMenuItem>
            </DialogReview>
          ) : (
            <Dialog
              onOpenChange={() => {
                setFilmToReview(null);
              }}
            >
              <DialogTrigger>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="text-beeBrownBackground data-[highlighted]:bg-beeBrownLightDarker data-[highlighted]:text-beeBeig hover:cursor-pointer rounded-none"
                >
                  New review
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="border-none justify-center">
                <FilmsSearchBar
                  action="reviewFilm"
                  setFilmToReview={setFilmToReview}
                />
              </DialogContent>
            </Dialog>
          )}
          <Dialog
            onOpenChange={() => {
              setFilmsOnNewList([]);
              setListTitle("");
              setListDescription("");
            }}
          >
            <DialogTrigger>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-beeBrownBackground data-[highlighted]:bg-beeBrownLightDarker data-[highlighted]:text-beeBeig hover:cursor-pointer rounded-none"
              >
                New list
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="border-none max-w-fit">
              <DialogTitle>Create a new list </DialogTitle>
              <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="listTitle">List title</label>
                    <input
                      autoComplete="off"
                      type="text"
                      id="listTitle"
                      value={listTitle}
                      onChange={(e) => {
                        setListTitle(e.target.value);
                      }}
                      className="w-[30ch] text-beeBrownBackground bg-beeBeig rounded-sm px-1 py-0.5"
                    />
                    <label htmlFor="listDescription">Description</label>
                    <textarea
                      className="w-[30ch] text-beeBrownBackground bg-beeBeig rounded-sm px-1 py-0.5"
                      name="listDescription"
                      id="listDescription"
                      cols={12}
                      rows={4}
                      value={listDescription}
                      onChange={(e) => {
                        setListDescription(e.target.value);
                      }}
                    />
                    <FilmsSearchBar
                      className="flex-col gap-1"
                      action="addFilmToList"
                      filmsOnNewList={filmsOnNewList}
                      setFilmsOnNewList={setFilmsOnNewList}
                    />
                  </div>
                  <div className="bg-beeBrownHeader min-w-[15rem] rounded-sm w-[40ch] p-2 overflow-hidden h-72">
                    <ScrollArea className="h-full">
                      <ul className="flex flex-col gap-2">
                        {filmsOnNewList.map((film) => {
                          return (
                            <li
                              className="text-beeBeig flex flex-row gap-2 group"
                              key={film.id}
                            >
                              <span>
                                {film.title}{" "}
                                <span className="text-xs opacity-70">
                                  {film.release_date.slice(0, 4)}
                                </span>
                              </span>

                              <button
                                className="invisible group-hover:visible"
                                onClick={() => {
                                  setFilmsOnNewList(
                                    filmsOnNewList.filter((filmOnList) => {
                                      return filmOnList.id !== film.id;
                                    })
                                  );
                                }}
                              >
                                <RemoveIcon className="w-4 h-4 self-center" />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </ScrollArea>
                  </div>
                </div>
                <DialogClose asChild>
                  <button
                    type="submit"
                    className="bg-beeYellow text-beeBrownBackground self-end px-2 py-0.5 rounded-md"
                  >
                    Save
                  </button>
                </DialogClose>
              </form>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
      <Toaster />
    </>
  );
}
