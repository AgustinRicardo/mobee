import { Rating } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import HexagonIcon from "./icons/HexagonIcon";

interface Props {
  setRatingValue: Dispatch<SetStateAction<number | null>>;
}
export default function RatingPicker({ setRatingValue }: Props) {
  const size = "2.5rem";
  return (
    <>
      <Rating
        onChange={(event, value) => {
          if (value) {
            setRatingValue(value);
          }
        }}
        precision={0.5}
        icon={
          <HexagonIcon
            style={{ width: size, height: size }}
            className="text-beeYellow"
          />
        }
        emptyIcon={
          <HexagonIcon
            style={{ width: size, height: size }}
            className="text-beeBrownLight"
          />
        }
        max={5}
      ></Rating>
    </>
  );
}
