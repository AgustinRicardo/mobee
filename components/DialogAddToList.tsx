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
    fetch("/api/my_profile/lists?" + new URLSearchParams({ userId }))
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.lists) {
          setLists(data.lists);
        }
      });
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const listData = {
      apiId,
      listId: selectedList,
    };
    try {
      const res = await fetch("/api/filmOnList", {
        method: "POST",
        body: JSON.stringify(listData),
      });
      const data = await res.json();

      if (data.filmOnList !== null) {
        toast({
          title: "Film already added to the current list",
          description: "This film has been already added to the current list",
        });
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <Dialog onOpenChange={() => {}}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="border-none w-24">
          <DialogTitle>Add film to a list</DialogTitle>
          <form
            className="flex flex-col justify-start w-full gap-6"
            onSubmit={handleSubmit}
          >
            <ScrollArea className=" rounded-sm">
              <ul className="flex flex-col bg-beeBrownHeader">
                {lists &&
                  lists.map((list: List) => {
                    return (
                      <span
                        onClick={() => {
                          setSelectedList(list.id);
                        }}
                        key={list.id}
                      >
                        <li
                          className={
                            list.id === selectedList
                              ? "bg-beeBrownLight text-beeBrownBackground"
                              : ""
                          }
                        >
                          {list.title}
                        </li>
                      </span>
                    );
                  })}
              </ul>
            </ScrollArea>
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
      <Toaster />
    </>
  );
}
