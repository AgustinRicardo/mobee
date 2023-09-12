import ListCard from "@/components/ListCard";
import ReviewCard from "@/components/ReviewCard";

export default function MyProfilePage() {
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
            <span>192 </span>
            <span>watched films</span>
          </div>
        </div>

        <div className="flex flex-row text-beeYellow">
          <div className="favorite-films ">
            <span className="py-1 block">Favorite films</span>
            <hr className="border-beeYellow" />
            <ListCard imageGap="gap-3" imageWidth="w-28" />
          </div>
          <div className="watchlist ml-auto ">
            <div className="flex flex-row py-1">
              <span className="text-beeYellow">Watchlist</span>
              <button className="inline ml-auto text-beeYellow hover:bg-beeYellow hover:text-beeBrownBackground hover:rounded-sm px-1 ">
                More
              </button>
            </div>

            <hr className="border-beeYellow" />
            <ListCard imageGap="gap-3" imageWidth="w-28" />
          </div>
        </div>
        <div className="lists-section text-beeYellow">
          <div className="flex flex-row py-1">
            <span className="text-beeYellow">List</span>
            <button className="inline ml-auto text-beeYellow hover:bg-beeYellow hover:text-beeBrownBackground hover:rounded-sm px-1 py-0.5">
              More
            </button>
          </div>
          <hr className="border-beeYellow" />
          <div className="flex flex-row justify-between">
            <ListCard
              imageGap="gap-1"
              imageWidth="w-20"
              listTitle="List test1"
              numberOfFilms={0}
              apiIds={[]}
            />
            <ListCard
              imageGap="gap-1"
              imageWidth="w-20"
              listTitle="List test2"
              numberOfFilms={0}
              apiIds={[]}
            />
            <ListCard
              imageGap="gap-1"
              imageWidth="w-20"
              listTitle="List test3"
              numberOfFilms={0}
              apiIds={[]}
            />
          </div>
        </div>
        <div className="reviews-section">
          <div className="flex flex-row py-1">
            <span className="text-beeYellow">Recent activity</span>
            <button className="inline ml-auto text-beeYellow hover:bg-beeYellow hover:text-beeBrownBackground hover:rounded-sm px-1 py-0.5">
              More
            </button>
          </div>
          <hr className="border-beeYellow" />
          <ReviewCard />
          <hr className="opacity-50 border-beeBrownLight" />
          <ReviewCard />
          <hr className="opacity-50 border-beeBrownLight" />
          <ReviewCard />
        </div>
      </div>
    </>
  );
}
