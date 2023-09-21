"use client";

import { User } from "@/lib/interfaces";
import FilmList from "./FilmList";
import FilmTabs from "./FilmTabs";
import FilterFilmList from "./FilterFilmList";
import { useState } from "react";

interface Props {
  user: User;
}

export default function FilmsPageContent({ user }: Props) {
  const [page, setPage] = useState(1);

  return (
    <>
      <section className="py-6">
        <FilmTabs
          setPage={setPage}
          popular={
            <FilmList
              url={`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`}
              userId={user.id}
              page={page}
              setPage={setPage}
            />
          }
          upcoming={
            <FilmList
              url={`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`}
              userId={user.id}
              page={page}
              setPage={setPage}
            />
          }
          nowPlaying={
            <FilmList
              url={`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`}
              userId={user.id}
              page={page}
              setPage={setPage}
            />
          }
          recentReviews={
            <FilmList
              url={`/api/recentlyReviewedFilms?page=${page}`}
              userId={user.id}
              ownDB
              page={page}
              setPage={setPage}
            />
          }
          filter={
            <FilterFilmList userId={user.id} setPage={setPage} page={page} />
          }
        ></FilmTabs>
      </section>
    </>
  );
}
