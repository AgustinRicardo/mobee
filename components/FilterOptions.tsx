"use client";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownIcon from "./icons/DropdownIcon";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Genre, Year } from "@/lib/interfaces";

interface Props {
  setGenres: Dispatch<SetStateAction<Genre[]>>;
  setYears: Dispatch<SetStateAction<Year[]>>;
  genres: Genre[];
  years: Year[];
}

export default function FilterOptions({
  setGenres,
  genres,
  years,
  setYears,
}: Props) {
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
      .then(({ genres }) => {
        genres.forEach((genre: { id: number; name: string }) => {
          return { ...genre, checked: false };
        });
        setGenres(genres);
      });
  }, []);
  const triggerClass =
    "bg-beeYellow rounded-sm text-beeBrownBackground items-center px-2 py-1";
  const iconClass = "inline w-5 h-5";
  const contentStyle = "bg-beeBrownLight border-none";

  return (
    <div className="filters flex flex-row items-center gap-1">
      <span>Browse by</span>
      <DropdownMenu>
        <DropdownMenuTrigger className={triggerClass}>
          Year <DropdownIcon className={iconClass} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={contentStyle}>
          {years.map((selectYear) => {
            return (
              <DropdownMenuCheckboxItem
                checked={selectYear.checked}
                onCheckedChange={() => {
                  setYears(
                    years.map((year) => {
                      if (selectYear.id === year.id) {
                        return { ...year, checked: !year.checked };
                      } else {
                        return { ...year, checked: false };
                      }
                    })
                  );
                }}
                className="text-beeBeig data-[highlighted]:bg-beeBeig data-[highlighted]:text-beeBrownBackground py-0"
                key={selectYear.id}
              >
                {selectYear.name}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger className={triggerClass}>
          Genre <DropdownIcon className={iconClass} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={contentStyle}>
          {genres.map((selectGenre) => {
            return (
              <DropdownMenuCheckboxItem
                checked={selectGenre.checked}
                onCheckedChange={() => {
                  setGenres(
                    genres.map((genre) => {
                      if (selectGenre.id === genre.id) {
                        return { ...genre, checked: !genre.checked };
                      } else {
                        return genre;
                      }
                    })
                  );
                }}
                className="text-beeBeig data-[highlighted]:bg-beeBeig data-[highlighted]:text-beeBrownBackground py-0"
                key={selectGenre.id}
              >
                {selectGenre.name}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
