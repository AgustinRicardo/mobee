"use client";
import { Review } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

interface Props {
  apiId: number;
}

export default function ReviewList({ apiId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch(`/api/film/reviews?apiId=${apiId}`)
      .then((res) => res.json())
      .then(({ reviews }) => {
        setReviews(reviews);
      });
  }, []);

  return (
    <>
      {reviews.length ? (
        reviews.map((review) => {
          return (
            <ReviewCard key={review.id} review={review} user={review.user} />
          );
        })
      ) : (
        <span className="py-4">No recent reviews</span>
      )}
    </>
  );
}
