"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  popular: React.ReactNode;
  nowPlaying: React.ReactNode;
  upcoming: React.ReactNode;
  recentReviews: React.ReactNode;
}

export default function FilmTabs({
  popular,
  nowPlaying,
  upcoming,
  recentReviews,
}: Props) {
  return (
    <>
      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="bg-beeBrownHeader text-beeBeig p-0 h-fit rounded-sm">
          <TabsTrigger
            className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground"
            value="popular"
          >
            Popular this week
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
            value="recentReview"
          >
            Recently reviewed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="popular">{popular}</TabsContent>
        <TabsContent value="nowPlaying">{nowPlaying}</TabsContent>
        <TabsContent value="upcoming">{upcoming}</TabsContent>
        <TabsContent value="recentReviews">{recentReviews}</TabsContent>
      </Tabs>
    </>
  );
}
