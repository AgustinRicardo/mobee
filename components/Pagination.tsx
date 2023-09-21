"use client";
import { Dispatch, SetStateAction, useState } from "react";
import FilmList from "./FilmList";
import LeftArrow from "./icons/LeftArrow";
import RightArrow from "./icons/RightArrow";

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  maxPage?: number;
}

export default function Pagination({ setPage, page, maxPage = 20 }: Props) {
  return (
    <>
      <div className="pagination flex flex-row items-center gap-3 self-end">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`bg-beeBrownHeader text-beeYellow rounded-sm h-4 flex items-center shadow-sm enabled:hover:scale-105 disabled:text-beeBrownLight`}
        >
          <LeftArrow />
        </button>
        <div className="current text-beeBeig bg-beeBrownHeader rounded-md px-2 ">
          {page}
        </div>
        <button
          disabled={page === maxPage}
          className="bg-beeBrownHeader text-beeYellow rounded-sm h-4 flex items-center shadow-sm enabled:hover:scale-105 disabled:text-beeBrownLight"
          onClick={() => setPage(page + 1)}
        >
          <RightArrow />
        </button>
      </div>
    </>
  );
}
