"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  cast: React.ReactNode;
  crew: React.ReactNode;
  details: React.ReactNode;
  genres: React.ReactNode;
}

export default function FilmDetailsTabs({
  cast,
  crew,
  details,
  genres,
}: Props) {
  return (
    <>
      <Tabs defaultValue="cast" className="w-full">
        <div className="flex flex-row items-center mt-10 pb-1">
          <TabsList className="text-beeYellow p-0 h-fit bg-transparent">
            <TabsTrigger
              className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground"
              value="cast"
            >
              CAST
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground"
              value="crew"
            >
              CREW
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground"
              value="details"
            >
              DETAILS
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground"
              value="genres"
            >
              GENRES
            </TabsTrigger>
          </TabsList>
        </div>
        <hr className="border-beeYellow" />
        <TabsContent value="cast">{cast}</TabsContent>
        <TabsContent value="crew">{crew}</TabsContent>
        <TabsContent value="details">{details}</TabsContent>
        <TabsContent value="genres">{genres}</TabsContent>
      </Tabs>
    </>
  );
}
