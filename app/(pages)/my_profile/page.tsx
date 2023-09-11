import ListCard from "@/components/ListCard";
import ReviewCard from "@/components/ReviewCard";

export default function MyProfilePage() {
  return (
    <>
      <img
        src="https://a.ltrbxd.com/resized/sm/upload/xm/8h/pb/zl/princess-mononoke-1200-1200-675-675-crop-000000.jpg?v=f1534e069c"
        alt="Profile Background"
        width="100%"
      />

      <div className="profile-info relative bottom-10 flex flex-row text-beeBeig px-20">
        <div className="flex flex-row">
          <img
            className="rounded-full w-16 h-16"
            src="/profile_photo.jpg"
            alt="user"
          />
          <div className="flex flex-col">
            <span>user</span>
            <button className="bg-beeBrownLight text-beeBrownBackground rounded-sm px-1 py-0.5 text-xs drop-shadow">
              Edit profile
            </button>
          </div>
        </div>
        <div className="profile-stats flex flex-row ml-auto gap-4">
          <div className="flex flex-col items-center">
            <span>192 </span>
            <span>films</span>
          </div>
          <div className="flex flex-col items-center">
            <span>80 </span>
            <span>films this year</span>
          </div>
          <div className="flex flex-col items-center">
            <span>45 </span>
            <span>lists</span>
          </div>
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
          <ListCard imageGap="gap-1" imageWidth="w-20" listTitle="List test1" numberOfFilms={0} filmsIds={[]}/>
          <ListCard imageGap="gap-1" imageWidth="w-20" listTitle="List test2" numberOfFilms={0} filmsIds={[]}/>
          <ListCard imageGap="gap-1" imageWidth="w-20" listTitle="List test3" numberOfFilms={0} filmsIds={[]}/>
        </div>
      </div>
      <div className="reviews-section ">
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
    </>
  );
}
