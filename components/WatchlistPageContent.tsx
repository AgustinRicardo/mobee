"use client";
import { useState } from "react";
import WatchlistDetails from "./WatchlistDetails";
import { User } from "@/lib/interfaces";

interface Props {
  user: User;
}

export default function WatchlistPageContent({ user }: Props) {
  const [page, setPage] = useState(1);
  return (
    <WatchlistDetails
      url={`/api/my_profile/watchlist?userId=${user.id}&page=${page}`}
      userId={user.id}
      page={page}
      setPage={setPage}
    />
  );
}
