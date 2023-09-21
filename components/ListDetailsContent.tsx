"use client";
import { useState } from "react";
import ListDetails from "./ListDetails";
import { User } from "@/lib/interfaces";

interface Props {
  listId: string;
  user: User;
}

export default function ListDetailsContent({ listId, user }: Props) {
  const [page, setPage] = useState(1);

  return (
    <ListDetails
      url={`/api/list?listId=${listId}&page=${page}`}
      userId={user?.id!}
      page={page}
      setPage={setPage}
    />
  );
}
