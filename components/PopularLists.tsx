"use client";

import { useEffect, useState } from "react";
import ListCard from "./ListCard";
import { List } from "@/lib/interfaces";

export default function RecentLists() {
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

  console.log("Popular Lists", popularList);

  return (
    <>
      {popularList.map((list) => {
        return (
          <ListCard
            key={list.id}
            imageGap="gap-1"
            imageWidth="w-20"
            listTitle={list.title}
            numberOfFilms={list.films.length}
            apiIds={list.films.slice(0, 4).map((film) => film.film.tmdb_id)}
          />
        );
      })}
    </>
  );
}
