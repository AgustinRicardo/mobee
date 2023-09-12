"use client";
import { FilmOnDB, Review, User } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

interface ReviewWithUserAndFilm {
  review: Review;
  user: User;
  film: FilmOnDB;
}

export default function HomeRecentReviews() {
  const [reviews, setReviews] = useState<ReviewWithUserAndFilm[]>([]);
  useEffect(() => {
    fetch("/api/review")
      .then((res) => {
        return res.json();
      })
      .then(({ recentReviewsWithUserAndFilm }) => {
        setReviews(recentReviewsWithUserAndFilm);
      });
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {reviews.map(({ review, user, film }) => {
          console.log(film);
          return (
            <ReviewCard
              key={review.id}
              review={review}
              user={user}
              filmOnDB={film}
            />
          );
        })}
      </div>
    </>
  );
}
