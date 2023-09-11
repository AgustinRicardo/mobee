"use client";

import { List } from "@/lib/interfaces";
import { useEffect, useState } from "react";

interface Props {
  userId: string;
}

export default function RecentLists({ userId }: Props) {
  console.log("user.id", userId);
  const [recentList, setRecentList] = useState<List[]>([]);

  useEffect(() => {
    console.log("useEffect", recentList);
    
    fetch("/api/listSavedByUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setRecentList(data);
        }
      });
  }, []);

  return (
    <>
      <div className="group">
        <div className="hidden flex-col justify-around px-2 py-2 gap-0.5 group-hover:flex absolute group-hover:bg-beeBrownLight/90 rounded-tl-md rounded-br-md ">
        </div>
      </div>
    </>
  );
}
