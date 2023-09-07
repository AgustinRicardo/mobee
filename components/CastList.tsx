import { Tooltip } from "@mui/material";

interface Props {
  cast: [{ name: string; character: string }];
}

export default function CastList({ cast }: Props) {
  return (
    <div>
      <ul className="flex flex-wrap">
      {cast.map((cast) => {
        return (
          <li key={cast.name}>
          <Tooltip title={cast.character} placement="top" className="bg-beeBrownLight text-beeBeig" arrow >
            <div className="bg-beeBrownLightText text-beeBeig rounded-md text-center w-fit m-1 p-1">{cast.name}</div>
          </Tooltip>
          </li>
        );
      })}
      </ul>
    </div>
  );
}
