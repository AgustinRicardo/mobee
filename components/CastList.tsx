"use client";
import { Tooltip } from "@mui/material";
import { useState } from "react";

interface Props {
  cast: [{ name: string; character: string }];
}

export default function CastList({ cast }: Props) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const numberOfItems = showMore ? cast.length : 10;
  return (
    <div className="mb-5">
      <ul className="flex flex-wrap">
        {cast.slice(0, numberOfItems).map((cast) => {
          return (
            <li key={cast.name}>
              <Tooltip
                title={cast.character}
                placement="top"
                className="bg-beeBrownLight text-beeBeig"
                arrow
              >
                <div className="bg-beeBrownLightText text-beeBeig rounded-md text-center w-fit m-1 p-1">
                  {cast.name}
                </div>
              </Tooltip>
            </li>
          );
        })}
        <button
          className="bg-beeBrownLightText text-beeBeig rounded-md text-center w-fit m-1 p-1 hover:bg-beeBeig hover:text-beeBrownLightText"
          onClick={() => {
            if (showMore) {
              setShowMore(false);
            } else {
              setShowMore(true);
            }
          }}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </ul>
    </div>
  );
}
