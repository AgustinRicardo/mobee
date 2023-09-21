"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilmsSearchBar from "./FilmsSearchBar";
import { Film } from "@/lib/interfaces";
import { Dispatch, SetStateAction } from "react";
import { setPriority } from "os";

interface Props {
  popular: React.ReactNode;
  nowPlaying: React.ReactNode;
  upcoming: React.ReactNode;
  recentReviews: React.ReactNode;
  filter: React.ReactNode;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function FilmTabs({
  popular,
  nowPlaying,
  upcoming,
  recentReviews,
  filter,
  setPage,
}: Props) {
  return (
    <>
      <Tabs
        defaultValue="popular"
        className="w-full"
        onValueChange={() => {
          setPage(1);
        }}
      >
        <div className="flex flex-row items-center">
          <TabsList className="bg-beeBrownHeader text-beeBeig p-0 h-fit rounded-sm">
            <TabsTrigger
              className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground"
              value="popular"
            >
              Popular
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground"
              value="nowPlaying"
            >
              Now Playing
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground"
              value="upcoming"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground"
              value="recentReviews"
            >
              Recently reviewed
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground"
              value="filter"
            >
              Filter
            </TabsTrigger>
          </TabsList>
          <FilmsSearchBar
            className="ml-auto flex-row"
            action="goToFilmDetails"
          />
        </div>

        <TabsContent value="popular">{popular}</TabsContent>
        <TabsContent value="nowPlaying">{nowPlaying}</TabsContent>
        <TabsContent value="upcoming">{upcoming}</TabsContent>
        <TabsContent value="recentReviews">{recentReviews}</TabsContent>
        <TabsContent value="filter">{filter}</TabsContent>
      </Tabs>
    </>
  );
}
