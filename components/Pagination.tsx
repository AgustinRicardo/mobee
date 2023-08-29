"use client";
import { useState } from "react";
import FilmList from "./FilmList";

interface Props {
  children: React.ReactNode;
}

export default function Pagination({ children }: Props) {
  const [page, setPage] = useState(1);

  return (
    <>
      {children}
      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="page"
        >
          Previous
        </button>
        <div className="current">{page}</div>
        <button className="page" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </>
  );
}
