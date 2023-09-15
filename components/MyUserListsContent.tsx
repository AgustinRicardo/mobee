"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilmOnList, List } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import ListCard from "./ListCard";
import FilmTabs from "./FilmTabs";
interface Props {
  userId: string;
}
export default function MyUserListsComponent({ userId }: Props) {
  const [lists, setLists] = useState<List[]>();
  const [savedLists, setSavedLists] = useState<List[]>();
  useEffect(() => {
    fetch(`/api/my_profile/lists?userId=${userId}`)
      .then((res) => res.json())
      .then(({ lists }) => {
        if (lists) {
          setLists(lists);
        }
      });

    fetch(`/api/my_profile/bookmarkedList?userId=${userId}`)
      .then((res) => res.json())
      .then(({ savedLists }) => {
        if (savedLists) {
          console.log(savedLists);
          setSavedLists(savedLists);
        }
      });
  }, []);

  return (
    <>
      <Tabs defaultValue="userLists" className="w-full py-4">
        <TabsList className="bg-beeBrownHeader text-beeBeig p-0 h-fit rounded-sm">
          <TabsTrigger
            className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground"
            value="userLists"
          >
            Your lists
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground"
            value="savedLists"
          >
            Saved lists
          </TabsTrigger>
        </TabsList>

        <TabsContent value="userLists">
          <div className="grid grid-cols-2">
            {lists &&
              lists.map((list) => {
                return (
                  <ListCard
                    key={list.id}
                    userId={userId}
                    imageGap="gap-1"
                    imageWidth="w-24"
                    list={list}
                    apiIds={list.films.map((filmOnList) => {
                      return filmOnList.film.tmdb_id;
                    })}
                    hideUser
                    canDelete
                  />
                );
              })}
          </div>
        </TabsContent>
        <TabsContent value="savedLists">
          <div className="grid grid-cols-2">
            {savedLists &&
              savedLists.map((list) => {
                return (
                  <ListCard
                    key={list.id}
                    userId={userId}
                    imageGap="gap-1"
                    imageWidth="w-24"
                    list={list}
                    apiIds={list.films.map((filmOnList) => {
                      return filmOnList.film.tmdb_id;
                    })}
                  />
                );
              })}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
