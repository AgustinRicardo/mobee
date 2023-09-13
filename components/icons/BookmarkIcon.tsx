import { MouseEventHandler } from "react";

interface Props {
  className: string;
  onClick: MouseEventHandler<SVGSVGElement>;
}
export default function BookmarkIcon({ className, onClick }: Props) {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="5 2.98 14.02 18.03"
    >
      <path
        fill="currentColor"
        d="M5 21V5q0-.825.588-1.413T7 3h10q.825 0 1.413.588T19 5v16l-7-3l-7 3Z"
      ></path>{" "}
    </svg>
  );
}
