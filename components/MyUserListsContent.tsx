"use client";
import { FilmOnList, List } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import ListCard from "./ListCard";
interface Props {
  userId: string;
}
export default function MyUserListsComponent({ userId }: Props) {
  const [lists, setLists] = useState<List[]>();
  useEffect(() => {
    fetch(`/api/my_profile/lists?userId=${userId}`)
      .then((res) => res.json())
      .then(({ lists }) => {
        if (lists) {
          setLists(lists);
        }
      });
  });

  return (
    <>
      <h1>Your lists</h1>
      <div className="grid grid-cols-2">
        {lists &&
          lists.map((list) => {
            return (
              <ListCard
                imageGap="gap-1"
                imageWidth="w-24"
                listTitle={list.title}
                listId={list.id}
                apiIds={list.films.map((filmOnList) => {
                  return filmOnList.film.tmdb_id;
                })}
              />
            );
          })}
      </div>
    </>
  );
}
