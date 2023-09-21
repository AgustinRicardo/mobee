"use client";
import { Review } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import Pagination from "./Pagination";

interface Props {
  userId: string;
}

export default function MyUserReviewsContent({ userId }: Props) {
  const [reviews, setReviews] = useState<Review[]>();
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>();

  useEffect(() => {
    fetch(`/api/my_profile/reviews?userId=${userId}&page=${page}`)
      .then((res) => res.json())
      .then(({ reviews, maxPage }) => {
        if (reviews) {
          setReviews(reviews);
          setMaxPage(maxPage);
        }
      });
  }, [page]);

  return (
    <>
      <h1 className="text-beeYellow font-openSans font-medium text-base tracking-wide uppercase mt-5">
        YOUR REVIEWS
      </h1>
      <hr className="border-beeYellow" />
      <div className="wrapper flex flex-col pb-5">
        <div className="grid grid-cols-2">
          {reviews &&
            reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                filmOnDB={review.film}
                canDelete
                canEdit
              />
            ))}
        </div>
        <Pagination setPage={setPage} page={page} maxPage={maxPage} />
      </div>
    </>
  );
}
