import { Rating } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import HexagonIcon from "./icons/HexagonIcon";

interface Props {
  setRatingValue?: Dispatch<SetStateAction<number | null>>;
  ratingValue?: number | null;
  emptyIconColor: string;
  readOnly?: boolean;
  averageRating?: number | null;

}
export default function RatingPicker({ setRatingValue, emptyIconColor, readOnly=false, ratingValue, averageRating=null }: Props) {
  const size = "2.5rem";
  return (
    <>
      <Rating
        onChange={(event, value) => {
          if (value && setRatingValue) {
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
            className={emptyIconColor}
          />
        }
        max={5}
        readOnly={readOnly}
        value={ratingValue ? ratingValue : averageRating}
      ></Rating>
    </>
  );
}
