"use client";
import { FilmOnDB, FilmsOnLists, List } from "@/lib/interfaces";
import FilmPoster from "./FilmPoster";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Pagination from "./Pagination";

interface Props {
  url: string;
  userId: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function ListDetails({ url, userId, page, setPage }: Props) {
  const [films, setFilms] = useState<FilmOnDB[]>();
  const [list, setList] = useState<List>();
  const [maxPage, setMaxPage] = useState<number>();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(({ list, maxPage }) => {
        if (list) {
          setList(list);
          setFilms(
            list.films.map((filmOnList: FilmsOnLists) => filmOnList.film)
          );
          setMaxPage(maxPage);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {list && (
        <>
          <div className="flex flex-col gap-4 py-4 font-openSans">
            <div className="wrapper flex flex-row gap-5">
              <div className="flex flex-col w-[100ch] border-t-2 border-b-2 border-beeBeig border-opacity-20 h-fit max-w-md gap-2 py-2">
                <h1 className="text-xl font-bold">{list.title}</h1>
                <div className="user flex flex-row gap-2 pb-5">
                  <img
                    src={list.user.profile_picture_path}
                    className="w-6 h-6 object-cover rounded-full"
                    alt=""
                  />
                  <span className="text-sm opacity-80">
                    {list.user.username}
                  </span>
                </div>
                <p className="opacity-80">
                  {list.description ? list.description : "No description"}
                </p>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {films &&
                  films.map((film) => {
                    return (
                      <FilmPoster
                        className="rounded-sm border-2 border-beeBrownLight"
                        key={film.id}
                        apiId={film.tmdb_id}
                        userId={userId}
                        canDelete={list.user_id === userId}
                        listId={list.id}
                      />
                    );
                  })}
              </div>
            </div>
            <Pagination setPage={setPage} page={page} maxPage={maxPage} />
          </div>
        </>
      )}
    </>
  );
}
