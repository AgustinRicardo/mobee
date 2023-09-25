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
        <div className="flex flex-row items-center mt-2">
          <TabsList className="text-beeYellow p-0 h-fit bg-transparent ">
            <TabsTrigger
              className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground font-openSans font-medium"
              value="cast"
            >
              CAST
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground font-openSans font-medium"
              value="crew"
            >
              CREW
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground font-openSans font-medium"
              value="details"
            >
              DETAILS
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-beeYellow data-[state=active]:text-beeBrownBackground font-openSans font-medium"
              value="genres"
            >
              GENRES
            </TabsTrigger>
          </TabsList>
        </div>
        <hr className=" mt-2 border-beeYellow" />
        <TabsContent value="cast" className="font-openSans">
          {cast}
        </TabsContent>
        <TabsContent value="crew" className="font-openSans">
          {crew}
        </TabsContent>
        <TabsContent value="details" className="font-openSans">
          {details}
        </TabsContent>
        <TabsContent value="genres" className="font-openSans">
          {genres}
        </TabsContent>
      </Tabs>
    </>
  );
}
