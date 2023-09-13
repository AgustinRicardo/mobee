"use client";
import { useRouter } from "next/navigation";
import FilmImageCard from "./FilmImageCard";

interface Props {
  imageGap: string;
  imageWidth: string;
  listTitle?: string;
  apiIds?: number[];
  listId?: string;
}

export default function ListCard({
  imageGap,
  imageWidth,
  listTitle,
  apiIds,
  listId,
}: Props) {
  const router = useRouter();

  return (
    <>
      <div
        className="flex flex-col"
        onClick={() => {
          if (listId) {
            router.push(`/list_details/${listId}`);
          }
        }}
      >
        <div
          className={`film-posters flex flex-row items-center ${imageGap} py-4`}
        >
          {apiIds?.map((apiId) => {
            return (
              <FilmImageCard
                key={apiId}
                apiId={apiId}
                imageWidth={imageWidth}
              />
            );
          })}
        </div>
        {listTitle && apiIds ? (
          <div className="flex flex-row">
            <span className="pr-2">
              {listTitle}
              {":"}
            </span>
            <span>
              {apiIds.length} {apiIds.length > 1 ? "films" : "film"}
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
