"use client";
import { useEffect, useState } from "react";
import ListCard from "./ListCard";
import ReviewCard from "./ReviewCard";
import { WatchStatus, Review, List } from "@/lib/interfaces";

interface Props {
  userId: string;
}

export default function ProfileContent({ userId }: Props) {
  const [watchlist, setWatchlist] = useState<WatchStatus[]>();
  const [reviews, setReviews] = useState<Review[]>();
  const [lists, setLists] = useState<List[]>();
  const [watchedFilms, setWatchFilms] = useState<number>();

  useEffect(() => {
    fetch(`/api/my_profile?userId=${userId}`)
      .then((res) => res.json())
      .then(({ watchlist, reviews, lists, watchedFilms }) => {
        setWatchlist(watchlist);
        setReviews(reviews);
        setLists(lists);
        setWatchFilms(watchedFilms);
      });
  }, []);

  return (
    <>
      <div className="relative z-0 mx-[-2%]">
        <div className="absolute z-10 bg-gradientOverlay w-full h-full"></div>

        <img
          src="https://a.ltrbxd.com/resized/sm/upload/xm/8h/pb/zl/princess-mononoke-1200-1200-675-675-crop-000000.jpg?v=f1534e069c"
          alt="Profile Background"
          width="100%"
          className="z-0 relative"
        />
      </div>
      <div className="content relative bottom-40 flex flex-col">
        <div className="profile-info flex flex-row text-beeBeig px-20 pb-10">
          <div className="flex flex-row gap-4">
            <img
              className="rounded-full w-14 h-14"
              src="/profile_photo.jpg"
              alt="user"
            />
            <div className="flex flex-col gap-2">
              <span>user</span>
              <button className="bg-beeBrownLight text-beeBrownBackground rounded-sm px-1 py-0.5 text-xs drop-shadow">
                Edit profile
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center ml-auto">
            <span>{watchedFilms}</span>
            <span>Watched films</span>
          </div>
        </div>

        <div className="flex flex-row text-beeYellow">
          <div className="favorite-films ">
            <span className="py-1 block">FAVORITE FILMS</span>
            <hr className="border-beeYellow" />
            <ListCard imageGap="gap-3" imageWidth="w-28" />
          </div>
          <div className="watchlist ml-auto ">
            <div className="flex flex-row py-1">
              <span className="text-beeYellow">WATCHLIST</span>
              <button className="inline ml-auto text-beeYellow hover:bg-beeYellow hover:text-beeBrownBackground hover:rounded-sm px-1 ">
                More
              </button>
            </div>

            <hr className="border-beeYellow" />
            {watchlist && (
              <ListCard
                imageGap="gap-3"
                imageWidth="w-28"
                apiIds={watchlist.map((status) => status.film.tmdb_id)}
              />
            )}
          </div>
        </div>
        <div className="lists-section text-beeYellow">
          <div className="flex flex-row py-1">
            <span className="text-beeYellow">LISTS</span>
            <button className="inline ml-auto text-beeYellow hover:bg-beeYellow hover:text-beeBrownBackground hover:rounded-sm px-1 py-0.5">
              More
            </button>
          </div>
          <hr className="border-beeYellow" />
          <div className="flex flex-row justify-between">
            {lists &&
              lists.map((list) => {
                return (
                  <ListCard
                    imageGap="gap-1"
                    imageWidth="w-20"
                    listTitle={list.title}
                    listId={list.id}
                    apiIds={list.films.map((item) => item.film.tmdb_id)}
                  />
                );
              })}
          </div>
        </div>
        <div className="reviews-section">
          <div className="flex flex-row py-1">
            <span className="text-beeYellow">RECENT ACTIVITY</span>
            <button className="inline ml-auto text-beeYellow hover:bg-beeYellow hover:text-beeBrownBackground hover:rounded-sm px-1 py-0.5">
              More
            </button>
          </div>
          <hr className="border-beeYellow" />
          <div className="grid grid-cols-2">
            {reviews &&
              reviews.map((review) => {
                return <ReviewCard review={review} filmOnDB={review.film} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}
