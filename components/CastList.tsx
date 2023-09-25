"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

interface Props {
  cast: [{ name: string; character: string }];
}

export default function CastList({ cast }: Props) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const numberOfItems = showMore ? cast.length : 10;
  const showButton = !(cast.length < 10);
  return (
    <>
      {cast.length ? (
        <div className="mb-5">
          <ul className="flex flex-wrap">
            {cast.slice(0, numberOfItems).map((cast) => {
              return (
                <li key={cast.name}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="bg-beeBrownLight text-beeBrownHeader rounded-md text-center w-fit m-1 py-1 px-2 hover:cursor-default">
                          {cast.name}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-beeBrownLight">
                        {cast.character}
                        <TooltipArrow className="fill-beeBrownLight text-beeBrownBackground font-openSans" />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
              );
            })}
            {showButton && (
              <button
                className="bg-beeBrownLightText text-beeBeig rounded-md text-center w-fit m-1 py-1 px-2 hover:bg-beeBeig hover:text-beeBrownLightText font-openSans"
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
            )}
          </ul>
        </div>
      ) : (
        <span>No details</span>
      )}
    </>
  );
}
