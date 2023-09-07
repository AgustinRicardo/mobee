"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Film, List } from "@/lib/interfaces";
import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
  apiId: number;
  userId: string;
  children: React.ReactNode;
}

export function DialogAddToList({ apiId, userId, children }: Props) {
  const { toast } = useToast();
  const [lists, setLists] = useState<List[]>();
  const [selectedList, setSelectedList] = useState<string>();

  useEffect(() => {
    fetch("/api/list?" + new URLSearchParams({ userId }))
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.lists) {
          setLists(data.lists);
        }
      });
    console.log(lists);
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    /* if (ratingValue === null && review === "") {
      toast({
        title: "No rating nor review",
        description: "Provide at least a rating or a written review",
        variant: "destructive",
      });
    } else {
      const reviewData = {
        userId,
        apiId: film.id,
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
    } */
  };

  return (
    <>
      <Dialog onOpenChange={() => {}}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="border-none max-w-fit">
          <DialogTitle>Add film to a list </DialogTitle>
          <form className="flex flex-col justify-start" onSubmit={handleSubmit}>
            <ScrollArea>
              <ul className="flex flex-col">
                {lists &&
                  lists.map((list: List) => {
                    return (
                      <button
                        onClick={() => {
                          setSelectedList(list.id);
                        }}
                        key={list.id}
                      >
                        <li
                          className={
                            list.id === selectedList ? "bg-beeYellow" : ""
                          }
                        >
                          {list.title}
                        </li>
                      </button>
                    );
                  })}
              </ul>
            </ScrollArea>
            <DialogClose>
              <button
                type="submit"
                className="bg-beeYellow text-beeBrownBackground self-end"
              >
                Save
              </button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
}
