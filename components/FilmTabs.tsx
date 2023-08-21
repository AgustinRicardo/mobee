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
      <Tabs defaultValue="popular" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="popular">Popular this week</TabsTrigger>
          <TabsTrigger value="nowPlaying">Now Playing</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="recentReview">Recently reviewed</TabsTrigger>
        </TabsList>
        <TabsContent value="popular">{popular}</TabsContent>
        <TabsContent value="nowPlaying">{nowPlaying}</TabsContent>
        <TabsContent value="upcoming">{upcoming}</TabsContent>
        <TabsContent value="recentReviews">{recentReviews}</TabsContent>
      </Tabs>
    </>
  );
}
