"use client";
import { List } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { useRouter } from "next/navigation";

export default function ListSearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>();
  const [lists, setLists] = useState<List[]>();
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
        <label htmlFor="listSearch" className="text-beeBeig">
          Find a list
        </label>
        <div className="relative">
          <input
            className="rounded-sm bg-beeBeig text-beeBrownBackground w-[30ch] px-2 py-1"
            type="text"
            id="listSearch"
            autoComplete="off"
            onChange={(e) => {
              if (e.target.value === "") {
                setLists([]);
              }
              setSearchQuery(e.target.value);
            }}
          />

          {lists && (
            <div className="absolute bg-beeBrownLight w-full rounded-md overflow-hidden">
              <ScrollArea>
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
