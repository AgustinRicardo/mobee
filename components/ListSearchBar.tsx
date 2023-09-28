"use client";
import { List } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { useRouter } from "next/navigation";
import SearchIcon from "./icons/SearchIcon";

export default function ListSearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [lists, setLists] = useState<List[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery) {
      fetch(`api/listSearch?searchQuery=${searchQuery}`)
        .then((res) => res.json())
        .then(({ results }) => {
          setLists(results);
        });
    }
  }, [searchQuery]);

  return (
    <>
      <div className="flex flex-row gap-2">
        <label htmlFor="listSearch" className="text-beeBeig py-1">
          Find a list
        </label>
        <div className="relative">
          <div className="flex flex-row items-center">
            <input
              className="rounded-sm bg-beeBeig text-beeBrownBackground w-[30ch] px-2 py-1 placeholder:text-beeBrownBackground placeholder:text-opacity-80"
              type="text"
              placeholder="Search"
              id="listSearch"
              autoComplete="off"
              onChange={(e) => {
                if (e.target.value === "") {
                  setLists([]);
                }
                setSearchQuery(e.target.value);
              }}
            />
            <SearchIcon />
          </div>

          {lists && (
            <div className="absolute bg-beeBrownLight rounded-md overflow-hidden z-20">
              <ScrollArea className="h-28 w-64 break-words">
                <ul className="rounded-md flex flex-col">
                  {lists.map((list) => {
                    return (
                      <button
                        key={list.id}
                        className="hover:text-beeBeig hover:bg-beeBrownLightDarker text-beeBrownBackground font-openSans text-sm px-2 py-1 text-start"
                        onClick={() => {
                          router.push(`/list_details/${list.id}`);
                        }}
                      >
                        <li>
                          <span>{list.title}</span>
                          <span className="text-xs font-medium pl-2">
                            {list.films.length} films
                          </span>
                        </li>
                      </button>
                    );
                  })}
                </ul>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
