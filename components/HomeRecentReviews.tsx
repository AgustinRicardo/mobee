"use client";
import { Review } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { Skeleton } from "@mui/material";
import ReviewSkeleton from "./ReviewSkeleton";

export default function HomeRecentReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/review")
      .then((res) => {
        return res.json();
      })
      .then(({ recentReviews }) => {
        setReviews(recentReviews);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-2 gap-12 py-6">
          <ReviewSkeleton />
          <ReviewSkeleton />
          <ReviewSkeleton />
          <ReviewSkeleton />
        </div>
      ) : reviews.length ? (
        <div className="grid grid-cols-2 gap-12 py-6">
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
          <div className="flex flex-col items-center py-4">
            <span>No recent reviews</span>
          </div>
        </>
      )}
      {}
    </>
  );
}
