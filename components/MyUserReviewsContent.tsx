"use client";
import { Review } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import Pagination from "./Pagination";
import ReviewSkeleton from "./ReviewSkeleton";

interface Props {
  userId: string;
}

export default function MyUserReviewsContent({ userId }: Props) {
  const [reviews, setReviews] = useState<Review[]>();
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/my_profile/reviews?userId=${userId}&page=${page}`)
      .then((res) => res.json())
      .then(({ reviews, maxPage }) => {
        if (reviews) {
          setReviews(reviews);
          setMaxPage(maxPage);
          setIsLoading(false);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <div className="wrapper py-4">
        <h1 className="text-beeYellow font-openSans font-medium text-base tracking-wide uppercase">
          YOUR REVIEWS
        </h1>
        <hr className="border-beeYellow" />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-6">
          <ReviewSkeleton />
          <ReviewSkeleton />
          <ReviewSkeleton />
          <ReviewSkeleton />
          <ReviewSkeleton />
          <ReviewSkeleton />
        </div>
      ) : (
        <div className="wrapper flex flex-col py-4">
          <div className="grid grid-cols-2 gap-6">
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
          <Pagination
            setPage={setPage}
            page={page}
            maxPage={maxPage}
            setIsLoading={setIsLoading}
          />
        </div>
      )}
    </>
  );
}
