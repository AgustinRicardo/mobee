"use client";
import { useRouter } from "next/navigation";
import FilmImageCard from "./FilmImageCard";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import { useEffect, useState } from "react";
import { List } from "@/lib/interfaces";
import DeleteIcon from "./icons/DeleteIcon";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";

interface Props {
  imageGap: string;
  imageWidth: string;
  list?: List;
  apiIds?: number[];
  userId?: string;
  hideUser?: boolean;
  canDelete?: boolean;
}

export default function ListCard({
  imageGap,
  imageWidth,
  list,
  apiIds,
  userId,
  hideUser = false,
  canDelete = false,
}: Props) {
  const [savedList, setSavedList] = useState<boolean>(false);
  const [count, setCount] = useState<number>(list?.bookmark_count!);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (userId && list) {
      fetch(`/api/listSavedByUser?userId=${userId}&listId=${list.id}`)
        .then((res) => res.json())
        .then(({ saved }) => {
          setSavedList(saved);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col group w-fit">
        <div
          className={`film-posters flex flex-row items-center ${imageGap} hover:cursor-pointer  hover:border-beeBeig border-2 border-transparent rounded-sm`}
          onClick={() => {
            if (list) {
              router.push(`/list_details/${list.id}`);
            }
          }}
        >
          {apiIds?.slice(0, 4).map((apiId) => {
            return (
              <FilmImageCard
                key={apiId}
                apiId={apiId}
                imageWidth={imageWidth}
              />
            );
          })}
        </div>
        {list ? (
          <div className="flex flex-row items-center">
            <div className="flex flex-col">
              <div className="flex flex-row">
                <span
                  className="pr-2 hover:cursor-pointer"
                  onClick={() => {
                    if (list) {
                      router.push(`/list_details/${list.id}`);
                    }
                  }}
                >
                  {list.title}
                </span>
                {apiIds && (
                  <span className="opacity-50">
                    {apiIds.length} {apiIds.length > 1 ? "films" : "film"}
                  </span>
                )}
              </div>
              <div className="flex flex-row gap-2">
                {!hideUser && (
                  <div className="flex gap-1 items-center">
                    {list.user.profile_picture_path && (
                      <img
                        src={list.user.profile_picture_path}
                        alt=""
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    )}
                    <span>{list.user.username}</span>
                  </div>
                )}
                <div className="flex gap-1 items-center">
                  <span>{count}</span>
                  <BookmarkIcon className="text-beeBrownLight h-3 w-3 mt-0.5" />
                </div>
              </div>
            </div>

            {!(list.user_id === userId) && (
              <BookmarkIcon
                onClick={(e) => {
                  e.stopPropagation();
                  const saveListData = { userId, listId: list.id };
                  if (savedList) {
                    fetch(`/api/listSavedByUser`, {
                      method: "DELETE",
                      body: JSON.stringify(saveListData),
                    });
                    toast({ title: "List removed from your saved lists" });

                    setSavedList(!savedList);
                    if (count !== 0) {
                      setCount(count - 1);
                    }
                  } else {
                    fetch(`/api/listSavedByUser`, {
                      method: "POST",
                      body: JSON.stringify(saveListData),
                    });
                    toast({ title: "List added to your saved lists" });

                    setSavedList(!savedList);
                    setCount(count + 1);
                  }
                }}
                className={`hidden group-hover:inline ml-auto w-5 h-5 hover:cursor-pointer hover:scale-110 ${
                  savedList ? "text-beeYellow" : "text-beeBrownHeader"
                } `}
              />
            )}

            {canDelete && (
              <DeleteIcon
                className="w-5 h-5 text-beeBrownLight group-hover:block hidden ml-auto hover:cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toast({
                    title: `Are you sure you want to delete "${list.title}"?`,
                    action: (
                      <ToastAction
                        className="hover:bg-beeRed"
                        altText="Delete"
                        onClick={() => {
                          fetch(`/api/list?listId=${list.id}`, {
                            method: "DELETE",
                          })
                            .then(() => {
                              location.reload();
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }}
                      >
                        Delete
                      </ToastAction>
                    ),
                  });
                }}
              />
            )}
            <Toaster />
          </div>
        ) : null}
      </div>
    </>
  );
}
