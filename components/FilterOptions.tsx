"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownIcon from "./icons/DropdownIcon";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Genre, Year } from "@/lib/interfaces";

interface Props {
  setGenres: Dispatch<SetStateAction<Genre[]>>;
  setYears: Dispatch<SetStateAction<Year[]>>;
  genres: Genre[];
  years: Year[];
  setPage: Dispatch<SetStateAction<number>>;
}

export default function FilterOptions({
  setGenres,
  genres,
  years,
  setYears,
  setPage,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="filters flex flex-row items-center gap-1">
      <span>Browse by</span>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-beeYellow rounded-sm text-beeBrownBackground items-center px-2 py-1">
          Year <DropdownIcon className="inline w-5 h-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-beeBrownLight border-none text-beeBeig p-0 font-openSans">
          {years.map((selectYear) => {
            return (
              <DropdownMenuCheckboxItem
                className="text-beeBrownBackground data-[highlighted]:bg-beeBrownLightDarker data-[highlighted]:text-beeBeig hover:cursor-pointer rounded-none py-0.5"
                checked={selectYear.checked}
                onCheckedChange={() => {
                  setPage(1);
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
                key={selectYear.id}
              >
                {selectYear.name}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-beeYellow rounded-sm text-beeBrownBackground items-center px-2 py-1">
          Genre <DropdownIcon className="inline w-5 h-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-beeBrownLight border-none text-beeBeig p-0 font-openSans">
          {genres.map((selectGenre) => {
            return (
              <DropdownMenuCheckboxItem
                className="text-beeBrownBackground data-[highlighted]:bg-beeBrownLightDarker data-[highlighted]:text-beeBeig hover:cursor-pointer rounded-none py-0.5"
                checked={selectGenre.checked}
                onCheckedChange={() => {
                  setPage(1);
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
