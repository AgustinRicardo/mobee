"use client";

import { useEffect, useState } from "react";
import ListCard from "./ListCard";
import { List } from "@/lib/interfaces";
import ListSkeleton from "./ListSkeleton";
interface Props {
  userId: string;
}

export default function PopularLists({ userId }: Props) {
  const [popularList, setPopularList] = useState<List[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/popularLists", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.lists) {
          setPopularList(data.lists);
          setIsLoading(false);
        }
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-3 gap-5 py-6">
          <ListSkeleton />
          <ListSkeleton />
          <ListSkeleton />
          <ListSkeleton />
          <ListSkeleton />
          <ListSkeleton />
        </div>
      ) : popularList.length ? (
        <div className="grid grid-cols-3 gap-5 py-6">
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
        </div>
      ) : (
        <div className="flex flex-col items-center py-6">
          <span>No popular lists</span>
        </div>
      )}
    </>
  );
}
