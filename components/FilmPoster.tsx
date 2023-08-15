"use client";

import { useRouter } from "next/navigation";
import WatchedIcon from "./icons/WatchedIcon";
import ToWatchIcon from "./icons/ToWatchIcon";
import AdditionalOptionsIcon from "./icons/AdditionalOptionsIcon";
import AddToListIcon from "./icons/AddToListIcon";

interface Props {
  src: string;
  alt: string;
  id: string;
}

export default function FilmPoster({ src, alt, id }: Props) {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-row group">
        <div className="hidden flex-col justify-around p-2 gap-0.5 h-1/6 group-hover:flex absolute group-hover:bg-beeBrownLight/90 rounded-tl-md rounded-br-md border-beeBrownLight border-t border-l ">
          <WatchedIcon className="text-beeBrownBackground hover:cursor-pointer w-6" />
          <ToWatchIcon className="text-beeBrownBackground hover:cursor-pointer w-6" />
          <AddToListIcon className="text-beeBrownBackground hover:cursor-pointer w-6" />
          <AdditionalOptionsIcon className="text-beeBrownBackground hover:cursor-pointer w-6" />
        </div>

        <img
          onClick={() => {
            console.log("hola");
            router.push(`/film_details/${id}`);
          }}
          className="rounded-md border-2 border-beeBrownLight min-w-full"
          src={src}
          alt={alt}
        />
      </div>
    </>
  );
}
