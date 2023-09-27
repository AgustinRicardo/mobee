"use client";
import { Review } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { useRouter } from "next/navigation";
import ReviewSkeleton from "./ReviewSkeleton";

interface Props {
  apiId: number;
}

export default function ReviewList({ apiId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/film/reviews?apiId=${apiId}`)
      .then((res) => res.json())
      .then(({ reviews }) => {
        setReviews(reviews);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section>
        <div className="flex flex-row items-center ">
          <span className="text-beeYellow pb-1 uppercase">Recent reviews</span>
          {reviews.length !== 0 && (
            <button
              onClick={() => {
                router.push(`/film_details/${apiId}/reviews`);
              }}
              className="font-openSans py-0.5 px-1 rounded-sm text-sm ml-auto text-beeYellow hover:text-beeBrownLightText hover:bg-beeYellow"
            >
              More
            </button>
          )}
        </div>
        <hr className="border-beeYellow" />
        {isLoading ? (
          <div className="py-4 flex flex-col gap-4">
            <ReviewSkeleton hideMovie />
            <ReviewSkeleton hideMovie />
            <ReviewSkeleton hideMovie />
          </div>
        ) : reviews.length ? (
          <div className="py-4 flex flex-col gap-4">
            {reviews.map((review) => {
              return (
                <ReviewCard
                  key={review.id}
                  review={review}
                  user={review.user}
                />
              );
            })}
          </div>
        ) : (
          <div className="py-4 flex flex-col items-center">
            <span>No recent reviews</span>
          </div>
        )}
      </section>
    </>
  );
}
