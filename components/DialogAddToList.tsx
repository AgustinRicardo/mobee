"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { List } from "@/lib/interfaces";
import { FormEventHandler, useEffect, useState } from "react";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { useToast } from "./ui/use-toast";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
  apiId: number;
  userId: string;
  children: React.ReactNode;
}

export function DialogAddToList({ apiId, userId, children }: Props) {
  const { toast } = useToast();
  const [lists, setLists] = useState<List[]>([]);
  const [selectedList, setSelectedList] = useState<string>();

  useEffect(() => {
    fetch("/api/my_profile/lists_listing?" + new URLSearchParams({ userId }))
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.lists) {
          setLists(data.lists);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          variant: "destructive",
        });
      } else {
        if (lists) {
          console.log("hello");
          toast({
            title: `Film added to ${
              lists.find((list) => list.id === selectedList)?.title
            }`,
          });
        }
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
          <DialogTitle>Select a list</DialogTitle>
          <form
            className="flex flex-col justify-start w-full gap-6 h-52"
            onSubmit={handleSubmit}
          >
            {lists?.length ? (
              <ScrollArea className="rounded-sm h-full w-[29rem]">
                <ul className="flex flex-col bg-beeBrownHeader overflow-hidden">
                  {lists.map((list: List) => {
                    return (
                      <li
                        onClick={() => {
                          setSelectedList(list.id);
                        }}
                        key={list.id}
                        className={
                          list.id === selectedList
                            ? "bg-beeBrownLight text-beeBrownBackground hover:cursor-pointer p-1 w-full "
                            : "hover:cursor-pointer p-1 w-full"
                        }
                      >
                        {list.title}
                      </li>
                    );
                  })}
                </ul>
              </ScrollArea>
            ) : (
              <div className="flex flex-col justify-center items-center h-full">
                <span>There are no lists created yet. Create one first.</span>
              </div>
            )}
            <DialogClose asChild>
              <button
                type="submit"
                disabled={lists.length === 0}
                className="bg-beeYellow text-beeBrownBackground self-end px-2 py-0.5 rounded-md my-0 disabled:text-beeBrownLight disabled:opacity-50 disabled:bg-beeBrownHeader"
              >
                Save
              </button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
