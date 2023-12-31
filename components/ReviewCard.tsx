"use client";
import { FilmOnDB, Review, User, Film } from "@/lib/interfaces";
import { usePathname, useRouter } from "next/navigation";
import FilmImageCard from "./FilmImageCard";
import { useEffect, useState } from "react";
import RatingPicker from "./RatingPicker";
import DeleteIcon from "./icons/DeleteIcon";
import { ToastAction } from "./ui/toast";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { DialogReview } from "./DialogReview";
import EditIcon from "./icons/EditIcon";

interface Props {
  filmOnDB?: FilmOnDB;
  user?: User;
  review?: Review;
  canDelete?: boolean;
  canEdit?: boolean;
}
export default function ReviewCard({
  filmOnDB,
  user,
  review,
  canDelete = false,
  canEdit = false,
}: Props) {
  const pathname = usePathname();
  const [film, setFilm] = useState<Film>();
  const { toast } = useToast();
  const router = useRouter();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-row items-start gap-4 group">
        {pathname.includes("/home") || pathname.includes("/my_profile") ? (
          <FilmImageCard imageWidth="w-20" apiId={filmOnDB?.tmdb_id!} />
        ) : null}
        <div className="review-info flex flex-col gap-2">
          {!pathname.includes("/film_details") && (
            <div className="film-title flex flex-row items-center gap-3">
              <span
                className="font-lora text-lg font-semibold hover:cursor-pointer"
                onClick={() => {
                  router.push(`/film_details/${String(filmOnDB?.tmdb_id!)}`);
                }}
              >
                {film?.title}
                <span className="opacity-50 ml-2 font-openSans text-xs font-light">
                  {film?.release_date ? film?.release_date.slice(0, 4) : "year"}
                </span>
              </span>
              {canDelete && (
                <DeleteIcon
                  className="w-5 h-5 text-beeBrownLight group-hover:block hidden ml-auto hover:cursor-pointer flex-shrink-0 hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast({
                      title: `Are you sure you want to delete the review?`,
                      action: (
                        <ToastAction
                          className="hover:bg-beeRed"
                          altText="Delete"
                          onClick={() => {
                            if (review) {
                              fetch(`/api/review?reviewId=${review.id}`, {
                                method: "DELETE",
                              })
                                .then(() => {
                                  location.reload();
                                })
                                .catch((error) => {
                                  console.log(error);
                                });
                            }
                          }}
                        >
                          Delete
                        </ToastAction>
                      ),
                    });
                  }}
                />
              )}
              {canEdit && film && (
                <DialogReview
                  film={film}
                  isEditing={true}
                  reviewFromDb={review}
                  userId={user?.id!}
                >
                  <span>
                    <EditIcon className="w-5 h-5 text-beeBrownLight group-hover:block hidden ml-auto hover:cursor-pointer flex-shrink-0 hover:scale-105" />
                  </span>
                </DialogReview>
              )}
            </div>
          )}
          <div className="user-rating-date flex flex-row items-center gap-3 align-middle">
            {!pathname.includes("/my_profile") && (
              <div className="user-handle flex flex-row items-center gap-1 font-openSans font-normal opacity-80 text-xs">
                <img
                  src={user?.profile_picture_path!}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>{user?.username}</span>
              </div>
            )}

            <RatingPicker
              readOnly={true}
              emptyIconColor="text-beeBrownBackground"
              averageRating={review?.rating}
              size={"0.8rem"}
            />
            {pathname.includes("/my_profile") && review?.watched_at ? (
              <span className="opacity-50">
                Watched at{" "}
                {new Date(review?.watched_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            ) : null}
          </div>
          <p className="review-description max-w-sm break-words font-openSans">
            {review?.review_description}
          </p>
        </div>

        <Toaster />
      </div>
    </>
  );
}
