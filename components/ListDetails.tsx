"use client";
import {
  Film,
  FilmOnDB,
  FilmsOnLists,
  List,
  WatchStatus,
} from "@/lib/interfaces";
import FilmPoster from "./FilmPoster";
import { useEffect, useState } from "react";

interface Props {
  url: string;
  userId: string;
}

export default function ListDetails({ url, userId }: Props) {
  const [films, setFilms] = useState<FilmOnDB[]>();
  const [list, setList] = useState<List>();
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(({ list, watchlist }) => {
        if (watchlist) {
          setFilms(watchlist.map((status: WatchStatus) => status.film));
        } else {
          setList(list);
          setFilms(
            list.films.map((filmOnList: FilmsOnLists) => filmOnList.film)
          );
        }
      });
  }, []);

  return (
    <>
      {list ? (
        <>
          <h1>{list.title}</h1>
          <p>{list.description}</p>
          <div className="grid grid-cols-5">
            {films &&
              films.map((film) => {
                return (
                  <FilmPoster
                    key={film.id}
                    apiId={film.tmdb_id}
                    userId={userId}
                    canDelete={list.user_id === userId}
                    listId={list.id}
                  />
                );
              })}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-5">
          {films &&
            films.map((film) => {
              return (
                <FilmPoster
                  key={film.id}
                  apiId={film.tmdb_id}
                  userId={userId}
                />
              );
            })}
        </div>
      )}
    </>
  );
}
