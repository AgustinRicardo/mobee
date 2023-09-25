"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { yearLabels } from "../lib/constants";
import FilterOptions from "./FilterOptions";
import FilmList from "./FilmList";
import { Genre, Year } from "@/lib/interfaces";

interface Props {
  userId: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function FilterFilmList({ userId, setPage, page }: Props) {
  let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}`;
  const [genres, setGenres] = useState<Genre[]>([]);
  const [years, setYears] = useState<Year[]>(
    yearLabels.map((year) => {
      return { ...year, checked: false };
    })
  );

  const checkedGenres = genres.filter((genre) => genre.checked);

  if (checkedGenres.length) {
    url += "&with_genres=";
    checkedGenres.forEach((genre, index) => {
      if (index === checkedGenres.length - 1) {
        url += `${genre.id}`;
      } else {
        url += `${genre.id}%2C`;
      }
    });
  }

  const checkedYear = years.filter((year) => year.checked);
  if (checkedYear.length) {
    url += `&primary_release_date.gte=${checkedYear[0].year_gte}&primary_release_date.lte=${checkedYear[0].year_lte}`;
  }

  return (
    <>
      <FilterOptions
        years={years}
        genres={genres}
        setGenres={setGenres}
        setYears={setYears}
        setPage={setPage}
      />
      <FilmList url={url} userId={userId} setPage={setPage} page={page} />
    </>
  );
}
