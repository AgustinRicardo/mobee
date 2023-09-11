"use client";
import { Film, Review, User } from "@/lib/interfaces";
import { usePathname } from "next/navigation";

interface Props {
  film?: Film;
  user?: User;
  review?: Review;
}
export default function ReviewCard({ film, user, review }: Props) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-row items-start py-4 gap-4">
        {pathname.includes("/home") || pathname.includes("/my_profile") ? (
          <img
            className="w-20 rounded-sm border-2 border-beeBrownLight"
            src="https://a.ltrbxd.com/resized/sm/upload/fu/5h/fp/mj/mNqZOtJIQfFQPjo3hmYLIn8Qqhf-0-230-0-345-crop.jpg?v=aae03975f7"
            alt=""
          />
        ) : null}
        <div className="review-info">
          {!pathname.includes("/film_details") && (
            <div className="film-title flex flex-row items-end gap-3">
              <span>Film name</span> <span className="opacity-50">year</span>
            </div>
          )}
          <div className="user-rating-date flex flex-row items-center gap-3 align-middle">
            {!pathname.includes("/my_profile") && (
              <div className="user-handle flex flex-row items-center gap-1 font-switzer font-light text-sm">
                <img
                  src="/profile_photo.jpg"
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
                <span>username</span>
              </div>
            )}

            <span>Rating</span>
            {pathname.includes("/my_profile") && (
              <span className="opacity-50">Watched at</span>
            )}
          </div>
          <p className="review-description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            voluptatibus quos. Tempora accusamus culpa voluptatibus distinctio
            cumque quibusdam ad neque perspiciatis quia sed, adipisci labore
            nisi natus impedit. Quas, quos.
          </p>
        </div>
      </div>
    </>
  );
}
