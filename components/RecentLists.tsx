"use client";

import { List } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import ListCard from "./ListCard";

export default function RecentLists() {
  const [recentList, setRecentList] = useState<List[]>([]);

  useEffect(() => {
    fetch("/api/recentLists", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.lists) {
          setRecentList(data.lists);
        }
      });
  }, []);

  return (
    <>
      <>
        {recentList.map((list) => {
          return (
            <ListCard
              imageGap="gap-1"
              imageWidth="w-24"
              listTitle={list.title}
              numberOfFilms={list.films.length}
              apiIds={list.films.slice(0, 4).map((film) => film.film.tmdb_id)}
            />
          );
        })}
      </>
    </>
  );
}
