"use client";

import { useEffect, useState } from "react";
import ListCard from "./ListCard";
import { List } from "@/lib/interfaces";

export default function RecentLists() {
  const [popularList, setPopularList] = useState<List[]>([]);

  useEffect(() => {
    fetch("/api/listSavedByUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.lists) {
          setPopularList(data.lists.slice(0, 3));
        }
      });
  }, []);

  return (
    <>
      {popularList.map((list) => {
        return (
          <ListCard
            imageGap="gap-1"
            imageWidth="w-24"
            listTitle={list.title}
            numberOfFilms={list.films.length}
            filmsIds={list.films.slice(0, 4).map((film) => film.film.tmdb_id)}
          />
        );
      })}
    </>
  );
}
