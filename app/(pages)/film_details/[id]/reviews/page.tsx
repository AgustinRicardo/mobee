"use client";
import Pagination from "@/components/Pagination";
import ReviewCard from "@/components/ReviewCard";
import { Film } from "@/lib/interfaces";
import { Review } from "@/lib/interfaces";
import { useEffect, useState } from "react";

export default function FilmReviewsPage({
  params,
}: {
  params: { id: string };
}) {
  const apiId = Number(params.id);
  const [film, setFilm] = useState<Film>();
  const [reviews, setReviews] = useState<Review[]>();
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${apiId}?language=en-US`;
    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFilm(data);
      });

    fetch(`/api/film/allReviews?apiId=${apiId}&page=${page}`)
      .then((res) => res.json())
      .then(({ reviews, maxPage }) => {
        setReviews(reviews);
        setMaxPage(maxPage);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col py-5">
        {film && (
          <div className="film flex flex-row">
            <img
              className="w-28 border-2 border-beeBrownLight rounded-sm"
              src={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
              alt=""
            />
            <div className="flex flex-col pl-5 pt-5">
              <span className="font-openSans opacity-70 text-base">
                Reviews for
              </span>
              <span className="font-lora text-4xl font-semibold">
                {film.title}
              </span>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 py-4">
          {reviews &&
            reviews.map((review) => {
              return (
                <ReviewCard
                  review={review}
                  user={review.user}
                  key={review.id}
                />
              );
            })}
        </div>
        {maxPage !== 1 ? (
          <Pagination setPage={setPage} page={page} maxPage={maxPage} />
        ) : null}
      </div>
    </>
  );
}
