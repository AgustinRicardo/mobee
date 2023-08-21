import { getUser } from "../lib/functions";

export const revalidate = 1000;

export default async function UserProfile() {
  const user = await getUser();

  return (
    <div className="flex flex-row gap-2 items-center ">
      <img
        src="/profile_photo.jpg"
        alt="user image"
        className="w-8 h-8 rounded-full"
      />
      <span className="">{user ? user.username : "User"}</span>
    </div>
  );
}
