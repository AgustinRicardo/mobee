"use client";
import { FilmOnDB, Review, User, Film } from "@/lib/interfaces";
import { usePathname } from "next/navigation";
import FilmImageCard from "./FilmImageCard";
import { useEffect, useState } from "react";
import RatingPicker from "./RatingPicker";

interface Props {
  filmOnDB?: FilmOnDB;
  user?: User;
  review?: Review;
}
export default function ReviewCard({ filmOnDB, user, review }: Props) {
  const pathname = usePathname();
  const [film, setFilm] = useState<Film>();
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${filmOnDB?.tmdb_id}?language=en-US&append_to_response=credits`;
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
  }, []);

  return (
    <>
      <div className="flex flex-row items-start py-4 gap-4">
        {pathname.includes("/home") || pathname.includes("/my_profile") ? (
          <FilmImageCard imageWidth="w-20" apiId={filmOnDB?.tmdb_id!} />
        ) : null}
        <div className="review-info flex flex-col gap-2">
          {!pathname.includes("/film_details") && (
            <div className="film-title flex flex-row items-end gap-3">
              <span>{film?.title}</span>
              <span className="opacity-50">
                {film?.release_date ? film?.release_date.slice(0, 4) : "year"}
              </span>
            </div>
          )}
          <div className="user-rating-date flex flex-row items-center gap-3 align-middle">
            {!pathname.includes("/my_profile") && (
              <div className="user-handle flex flex-row items-center gap-1 font-switzer font-light text-sm">
                <img
                  src={user?.profile_picture_path!}
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
                <span>{user?.username}</span>
              </div>
            )}

            <RatingPicker
              readOnly={true}
              emptyIconColor="text-beeBrownBackground"
              averageRating={review?.rating}
              size={"1rem"}
            />
            {pathname.includes("/my_profile") && (
              <span className="opacity-50">
                Watched at {review?.watched_at.getDate()}
              </span>
            )}
          </div>
          <p className="review-description">{review?.review_description}</p>
        </div>
      </div>
    </>
  );
}
