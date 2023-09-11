"use client";
import FilmImageCard from "./FilmImageCard";

interface Props {
  imageGap: string;
  imageWidth: string;
  listTitle?: string;
  numberOfFilms?: number;
  filmsIds?: number[];
}

export default function ListCard({
  imageGap,
  imageWidth,
  listTitle,
  numberOfFilms,
  filmsIds,
}: Props) {
  
  return (
    <>
      <div className="flex flex-col">
        <div
          className={`film-posters flex flex-row items-center ${imageGap} py-4`}
        >
          {filmsIds?.map((filmId) => {
            return (
              <FilmImageCard key={filmId} filmId={filmId} imageWidth={imageWidth}/>
            );
          })}
        </div>
        {listTitle && numberOfFilms ? (
          <div className="flex flex-row">
            <span className="pr-2">
              {listTitle}
              {":"}
            </span>
            <span>
              {numberOfFilms} {numberOfFilms > 1 ? "films" : "film"}
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
