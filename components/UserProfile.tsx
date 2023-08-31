import { User } from "@/lib/interfaces";
import { getUser } from "../lib/functions";
import DropdownIcon from "./icons/DropdownIcon";

export const revalidate = 1000;

interface Props {
  user: User;
}
export default async function UserProfile({ user }: Props) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <img
        src="/profile_photo.jpg"
        alt="user image"
        className="w-8 h-8 rounded-full"
      />
      <span className="flex flex-row items-end">
        {user ? user.username : "User"} <DropdownIcon className="w-4 h-4 " />
      </span>
    </div>
  );
}
