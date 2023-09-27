/* eslint-disable react/no-unescaped-entities */
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import ListCard from "./ListCard";
import Pagination from "./Pagination";
import ListSkeleton from "./ListSkeleton";
interface Props {
  userId: string;
}
export default function MyUserListsComponent({ userId }: Props) {
  const [lists, setLists] = useState<List[]>();
  const [savedLists, setSavedLists] = useState<List[]>();
  const [page, setPage] = useState<number>(1);
  const [maxPageUserLists, setMaxPageUserLists] = useState<number>();
  const [maxPageSavedLists, setMaxPageSavedLists] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/my_profile/lists?userId=${userId}&page=${page}`)
      .then((res) => res.json())
      .then(({ lists, maxPage }) => {
        if (lists) {
          setLists(lists);
          setMaxPageUserLists(maxPage);
          setIsLoading(false);
        }
      });

    fetch(`/api/my_profile/bookmarkedList?userId=${userId}&page=${page}`)
      .then((res) => res.json())
      .then(({ savedLists, maxPage }) => {
        if (savedLists) {
          setSavedLists(savedLists);
          setMaxPageSavedLists(maxPage);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <div className="wrapper flex flex-col gap-5">
        <Tabs
          defaultValue="userLists"
          className="w-full py-4"
          onValueChange={() => {
            setPage(1);
          }}
        >
          <TabsList className="bg-beeBrownHeader text-beeBeig p-0 h-fit rounded-sm">
            <TabsTrigger
              className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground font-openSans"
              value="userLists"
            >
              Your lists
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground font-openSans"
              value="savedLists"
            >
              Saved lists
            </TabsTrigger>
          </TabsList>

          <TabsContent value="userLists">
            {isLoading ? (
              <div className="grid grid-cols-2 gap-6 py-2">
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
              </div>
            ) : lists?.length === 0 ? (
              <span className="w-full h-[100vh] justify-center items-center">
                You haven't created any list
              </span>
            ) : (
              <div className="wrapper flex flex-col py-2">
                <div className="grid grid-cols-2 gap-6">
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
                <Pagination
                  setPage={setPage}
                  page={page}
                  maxPage={maxPageUserLists}
                  setIsLoading={setIsLoading}
                />
              </div>
            )}
          </TabsContent>
          <TabsContent value="savedLists">
            {isLoading ? (
              <div className="grid grid-cols-2 gap-6 py-2">
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
              </div>
            ) : savedLists?.length === 0 ? (
              <span className="flex flex-col w-full h-[50vh] justify-center items-center font-openSans">
                No bookmarked lists
              </span>
            ) : (
              <>
                <div className="wrapper flex flex-col py-2">
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
                  <Pagination
                    setPage={setPage}
                    page={page}
                    maxPage={maxPageSavedLists}
                    setIsLoading={setIsLoading}
                  />
                </div>
              </>
            )}

            {}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
