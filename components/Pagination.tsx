"use client";
import { Dispatch, SetStateAction } from "react";
import LeftArrow from "./icons/LeftArrow";
import RightArrow from "./icons/RightArrow";

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  maxPage?: number;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
}

export default function Pagination({
  setPage,
  page,
  maxPage = 20,
  setIsLoading,
}: Props) {
  return (
    <>
      <div className="pagination flex flex-row items-center gap-3 self-end py-6">
        <button
          onClick={() => {
            setPage(page - 1);
            if (setIsLoading) {
              setIsLoading(true);
            }
          }}
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
          onClick={() => {
            setPage(page + 1);
            if (setIsLoading) {
              setIsLoading(true);
            }
          }}
        >
          <RightArrow />
        </button>
      </div>
    </>
  );
}
