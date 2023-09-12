import { SvgIcon } from "@mui/material";
import { CSSProperties } from "react";

interface Props {
  className: string;
  style: CSSProperties;
}

export default function HexagonIcon({ className, style }: Props) {
  return (
    <SvgIcon className={className} style={style}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="2.98 1.98 18.03 20.03">
        <path
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18c-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18c.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9Z"
        />
      </svg>
    </SvgIcon>
  );
}
