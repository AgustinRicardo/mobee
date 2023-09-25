"use client";

import { useEffect, useState } from "react";
import ListCard from "./ListCard";
import { List } from "@/lib/interfaces";
interface Props {
  userId: string;
}

export default function PopularLists({ userId }: Props) {
  const [popularList, setPopularList] = useState<List[]>([]);

  useEffect(() => {
    fetch("/api/popularLists", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.lists) {
          setPopularList(data.lists);
        }
      });
  }, []);

  return (
    <>
      {popularList.map((list) => {
        return (
          <ListCard
            userId={userId}
            key={list.id}
            list={list}
            imageGap="gap-1"
            imageWidth="w-20"
            apiIds={list.films.map((film) => film.film.tmdb_id)}
          />
        );
      })}
    </>
  );
}
