"use client";

import { List } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import ListCard from "./ListCard";
import ListSkeleton from "./ListSkeleton";

interface Props {
  userId: string;
}
export default function RecentLists({ userId }: Props) {
  const [recentList, setRecentList] = useState<List[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/recentLists", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.lists) {
          setRecentList(data.lists);
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
      ) : recentList.length ? (
        <div className="grid grid-cols-3 gap-5 py-6">
          {recentList.map((list) => {
            return (
              <ListCard
                key={list.id}
                userId={userId}
                imageGap="gap-1"
                imageWidth="w-20"
                list={list}
                apiIds={list.films.map((film) => film.film.tmdb_id)}
              />
            );
          })}
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center py-6">
            <span>No recent lists</span>
          </div>
        </>
      )}
    </>
  );
}
