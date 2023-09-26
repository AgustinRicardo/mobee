"use client";
import { useEffect, useState } from "react";
import ListCard from "./ListCard";
import ReviewCard from "./ReviewCard";
import { WatchStatus, Review, List, User } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import EditIcon from "./icons/EditIcon";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import FilmsSearchBar from "./FilmsSearchBar";

interface Props {
  user: User;
}

export default function ProfileContent({ user }: Props) {
  const supabase = createClientComponentClient();
  const [watchlist, setWatchlist] = useState<WatchStatus[]>();
  const [reviews, setReviews] = useState<Review[]>();
  const [lists, setLists] = useState<List[]>();
  const [watchedFilms, setWatchFilms] = useState<number>();
  const [photoPath, setPhotoPath] = useState<string>();
  const [backdropPath, setBackdropPath] = useState<string>(user.backdrop_path);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/my_profile?userId=${user.id}`)
      .then((res) => res.json())
      .then(({ watchlist, reviews, lists, watchedFilms, photoPath }) => {
        setWatchlist(watchlist);
        setReviews(reviews);
        setLists(lists);
        setWatchFilms(watchedFilms);
        setPhotoPath(photoPath);
      });

    const { data } = supabase.storage
      .from("profile-images")
      .getPublicUrl("public/default.jpg");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {backdropPath !== null ? (
        <div className="relative z-0 mx-[-2%]">
          <Dialog>
            <DialogTrigger className="flex flex-row items-center gap-1 opacity-80 absolute z-30 top-[65%] left-[80%] hover:opacity-100">
              <EditIcon className="inline w-4 h-4" />
              Set backdrop photo
            </DialogTrigger>
            <DialogContent className="border-none justify-center">
              <FilmsSearchBar
                action="setBackdrop"
                setBackdropPath={setBackdropPath}
                userId={user.id}
              />
            </DialogContent>
          </Dialog>

          <div className="absolute z-10 bg-gradientOverlay w-full h-full"></div>

          <img
            src={backdropPath}
            alt="Profile Background"
            width="100%"
            className="z-0 relative"
          />
        </div>
      ) : (
        <div className="relative z-0 mx-[-2%] h-16">
          <Dialog>
            <DialogTrigger className="flex flex-row items-center gap-1 opacity-80 absolute z-30 top-[65%] left-[80%] hover:opacity-100">
              <EditIcon className="inline w-4 h-4" />
              Set backdrop photo
            </DialogTrigger>
            <DialogContent className="border-none justify-center">
              <FilmsSearchBar
                action="setBackdrop"
                setBackdropPath={setBackdropPath}
                userId={user.id}
              />
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div
        className={`content relative flex flex-col font-openSans gap-4 ${
          backdropPath !== null ? "bottom-40" : ""
        }`}
      >
        <div className="flex flex-row text-beeYellow items-center">
          <div className="profile-info flex flex-row text-beeBeig p-5 gap-5 bg-beeBrownLight rounded-md mx-auto  border-beeBrownBackground justify-evenly">
            <div className="flex flex-row gap-2 items-center ">
              <div className="wrapper relative group">
                <img
                  className="rounded-full w-12 h-12 object-cover"
                  src={photoPath}
                  alt="user"
                />
                <label htmlFor="upload-photo">
                  <EditIcon className="hidden group-hover:block absolute top-[65%] left-[65%] bg-beeBrownHeader text-beeBeig rounded-full w-5 h-5 p-0.5 hover:cursor-pointer" />
                </label>
                <input
                  accept="image/jpeg"
                  type="file"
                  name="photo"
                  id="upload-photo"
                  className="hidden"
                  onChange={async (e) => {
                    const { files } = e.target;
                    if (files) {
                      if (
                        user.profile_picture_path?.includes("default") &&
                        user.profile_picture_path !== null
                      ) {
                        console.log("hola");
                        const { error: e1 } = await supabase.storage
                          .from("profile-images")
                          .remove([user.profile_picture_path]);
                        if (e1) {
                          console.log(e1);
                        }
                      }
                      const { error: e2 } = await supabase.storage
                        .from("profile-images")
                        .upload(`public/${user.id}/${files[0].name}`, files[0]);
                      if (e2) {
                        console.log(e2);
                      }

                      const { data } = supabase.storage
                        .from("profile-images")
                        .getPublicUrl(`public/${user.id}/${files[0].name}`);

                      setPhotoPath(data.publicUrl);
                      fetch("/api/my_profile", {
                        method: "PUT",
                        body: JSON.stringify({
                          profilePathname: data.publicUrl,
                          userId: user.id,
                        }),
                      });
                    }
                  }}
                />
              </div>

              <span>{user.username}</span>
            </div>
            <div className="flex flex-col items-center ml-auto">
              <span className="text- font-bold">{watchedFilms}</span>
              <span className="text-center">Watched films</span>
            </div>
          </div>

          <div className="watchlist flex flex-col gap-5">
            <div className="wrapper">
              <div className="flex flex-row py-1">
                <span className="text-beeYellow font-openSans">WATCHLIST</span>
                {watchlist ? (
                  <button
                    className="inline ml-auto text-beeYellow hover:bg-beeYellow hover:text-beeBrownBackground hover:rounded-sm px-1 "
                    onClick={() => {
                      router.push("/my_profile/watchlist");
                    }}
                  >
                    More
                  </button>
                ) : null}
              </div>

              <hr className="border-beeYellow" />
            </div>
            {watchlist && (
              <ListCard
                imageGap="gap-3"
                imageWidth="w-28"
                apiIds={watchlist.map((status) => status.film.tmdb_id)}
                hideUser
              />
            )}
          </div>
        </div>
        <div className="lists-section  pb-5">
          <div className="flex flex-row py-1">
            <span className="text-beeYellow font-openSans">LISTS</span>
            {lists ? (
              <button className="inline ml-auto text-beeYellow hover:bg-beeYellow hover:text-beeBrownBackground hover:rounded-sm px-1 py-0.5">
                More
              </button>
            ) : null}
          </div>
          <hr className="border-beeYellow pb-5" />
          <div className="flex flex-row justify-between">
            {lists ? (
              lists.map((list) => {
                return (
                  <ListCard
                    key={list.id}
                    hideUser
                    userId={user.id}
                    imageGap="gap-1"
                    imageWidth="w-20"
                    list={list}
                    apiIds={list.films.map((item) => item.film.tmdb_id)}
                  />
                );
              })
            ) : (
              <span>No created lists</span>
            )}
          </div>
        </div>
        <div className="reviews-section">
          <div className="flex flex-row ">
            <span className="text-beeYellow">RECENT ACTIVITY</span>
            {reviews ? (
              <button className="inline ml-auto text-beeYellow hover:bg-beeYellow hover:text-beeBrownBackground hover:rounded-sm px-1 py-0.5">
                More
              </button>
            ) : null}
          </div>
          <hr className="border-beeYellow pb-3" />
          <div className="grid grid-cols-2">
            {reviews ? (
              reviews.map((review) => {
                return (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    filmOnDB={review.film}
                  />
                );
              })
            ) : (
              <span>No reviews</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
