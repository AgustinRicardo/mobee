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
          <div className="wrapper flex flex-row gap-5">
            <div className="flex flex-col w-[100ch] border-t-2 border-b-2 border-beeBeig border-opacity-20 h-fit">
              <h1 className="text-xl">{list.title}</h1>
              <div className="user flex flex-row gap-2 pb-5">
                <img
                  src={list.user.profile_picture_path}
                  className="w-6 h-6 object-cover rounded-full"
                  alt=""
                />
                <span>{list.user.username}</span>
              </div>
              <p>{list.description ? list.description : "No description"}</p>
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
        </>
      ) : (
        <div className="grid grid-cols-5">
          {films &&
            films.map((film) => {
              return (
                <FilmPoster
                  className="rounded-sm border-2 border-beeBrownLight"
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
