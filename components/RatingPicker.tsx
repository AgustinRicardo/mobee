import { Rating } from "@mui/material";
import { Hexagon, HexagonOutlined } from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setRatingValue: Dispatch<SetStateAction<number | null>>;
}
export default function RatingPicker({ setRatingValue }: Props) {
  return (
    <>
      <Rating
        onChange={(event, value) => {
          if (value) {
            setRatingValue(value);
          }
        }}
        precision={0.5}
        icon={<Hexagon className="rotate-90 " style={{ color: "#F2C53D" }} />}
        emptyIcon={
          <HexagonOutlined
            className="rotate-90"
            style={{
              color: "#F2C53D",
            }}
          />
        }
        max={5}
      ></Rating>
    </>
  );
}
