"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownIcon from "./icons/DropdownIcon";
import { useEffect, useState } from "react";

interface Genre {
  id: number;
  name: string;
}
export default function FilterOptions() {
  const [genres, setGeneres] = useState<Genre[]>([]);
  const years = [];

  useEffect(() => {
    const url = "https://api.themoviedb.org/3/genre/movie/list";
    const authorization = `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    const options = {
      mehtod: "GET",
      headers: {
        accept: "application/json",
        Authorization: authorization,
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then(({ genres }) => setGeneres(genres));
  });
  const triggerClass =
    "bg-beeYellow rounded-sm text-beeBrownBackground items-center px-2 py-1";
  const iconClass = "inline w-5 h-5";
  return (
    <div className="filters flex flex-row items-center gap-1">
      <span>Browse by</span>
      <DropdownMenu>
        <DropdownMenuTrigger className={triggerClass}>
          Year <DropdownIcon className={iconClass} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger className={triggerClass}>
          Genre <DropdownIcon className={iconClass} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-beeBrownLight border-none">
          {genres.map((genre) => {
            return (
              <DropdownMenuItem className="py-0" key={genre.id}>
                {genre.name}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger className={triggerClass}>
          Rating <DropdownIcon className={iconClass} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="py-0">Highest first</DropdownMenuItem>
          <DropdownMenuItem className="py-0">Lowest first</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
