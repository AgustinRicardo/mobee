"use client";
import { Review } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

interface Props {
  userId: string;
}

export default function MyUserReviewsContent({ userId }: Props) {
  const [reviews, setReviews] = useState<Review[]>();

  useEffect(() => {
    fetch(`/api/my_profile/reviews?userId=${userId}`)
      .then((res) => res.json())
      .then(({ reviews }) => {
        if (reviews) {
          setReviews(reviews);
        }
      });
  }, []);

  return (
    <>
      <h1>Your reviews</h1>
      <div className="grid grid-cols-2">
        {reviews &&
          reviews.map((review) => (
            <ReviewCard review={review} filmOnDB={review.film} canDelete />
          ))}
      </div>
    </>
  );
}
