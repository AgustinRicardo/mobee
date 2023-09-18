"use client";

import { List } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import ListCard from "./ListCard";

interface Props {
  userId: string;
}
export default function RecentLists({ userId }: Props) {
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
      {recentList.map((list) => {
        return (
          <ListCard
            key={list.id}
            userId={userId}
            imageGap="gap-1"
            imageWidth="w-20"
            list={list}
            apiIds={list.films.slice(0, 4).map((film) => film.film.tmdb_id)}
          />
        );
      })}
    </>
  );
}
