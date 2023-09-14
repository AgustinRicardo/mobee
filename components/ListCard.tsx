"use client";
import { useRouter } from "next/navigation";
import FilmImageCard from "./FilmImageCard";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import { useEffect, useState } from "react";
import { List } from "@/lib/interfaces";

interface Props {
  imageGap: string;
  imageWidth: string;
  list?: List;
  apiIds?: number[];
  userId?: string;
}

export default function ListCard({
  imageGap,
  imageWidth,
  list,
  apiIds,
  userId,
}: Props) {
  const [savedList, setSavedList] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (userId && list) {
      fetch(`/api/listSavedByUser?userId=${userId}&listId=${list.id}`)
        .then((res) => res.json())
        .then(({ saved }) => {
          setSavedList(saved);
        });
    }
  }, []);

  return (
    <>
      <div
        className="flex flex-col group w-fit"
        onClick={() => {
          if (list) {
            router.push(`/list_details/${list.id}`);
          }
        }}
      >
        <div
          className={`film-posters flex flex-row items-center ${imageGap} pb-2`}
        >
          {apiIds?.map((apiId) => {
            return (
              <FilmImageCard
                key={apiId}
                apiId={apiId}
                imageWidth={imageWidth}
              />
            );
          })}
        </div>
        {list && apiIds ? (
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="flex flex-row">
                <span className="pr-2">{list.title}</span>
                <span className="opacity-50">
                  {apiIds.length} {apiIds.length > 1 ? "films" : "film"}
                </span>
              </div>
              <span>user</span>
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
                    setSavedList(!savedList);
                  } else {
                    fetch(`/api/listSavedByUser`, {
                      method: "POST",
                      body: JSON.stringify(saveListData),
                    });
                    setSavedList(!savedList);
                  }
                }}
                className={`hidden group-hover:inline ml-auto w-5 h-5 hover:cursor-pointer hover:scale-110 ${
                  savedList ? "text-beeYellow" : "text-beeBrownHeader"
                } `}
              />
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}
