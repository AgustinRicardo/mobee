"use client";
import { Review } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

export default function HomeRecentReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    fetch("/api/review")
      .then((res) => {
        return res.json();
      })
      .then(({ recentReviews }) => {
        setReviews(recentReviews);
      });
  }, []);

  return (
    <>
      {reviews.length ? (
        <div className="grid grid-cols-2 gap-4">
          {reviews.map((review) => {
            return (
              <ReviewCard
                key={review.id}
                review={review}
                user={review.user}
                filmOnDB={review.film}
              />
            );
          })}
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center py-6">
            <span>No recent reviews</span>
          </div>
        </>
      )}
    </>
  );
}
