"use client";
import { Film, FilmOnDB, FilmsOnLists, WatchStatus } from "@/lib/interfaces";
import FilmPoster from "./FilmPoster";
import { useEffect, useState } from "react";

interface Props {
  url: string;
  userId: string;
}

export default function ListDetails({ url, userId }: Props) {
  const [films, setFilms] = useState<FilmOnDB[]>();
  const [listTitle, setListTitle] = useState<string>();
  const [listDescription, setListDescription] = useState<string>();
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(({ list, watchlist }) => {
        if (watchlist) {
          setFilms(watchlist.map((status: WatchStatus) => status.film));
        } else {
          setListTitle(list.title);
          setListDescription;
          setFilms(
            list.films.map((filmOnList: FilmsOnLists) => filmOnList.film)
          );
        }
      });
  }, []);

  return (
    <>
      <h1>{listTitle}</h1>
      <p>{listDescription}</p>
      <div className="grid grid-cols-5">
        {films &&
          films.map((film) => {
            return <FilmPoster apiId={film.tmdb_id} userId={userId} />;
          })}
      </div>
    </>
  );
}
