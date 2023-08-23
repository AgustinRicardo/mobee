interface Props {
  className: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function HexagonIcon({ className, onMouseEnter, onMouseLeave }: Props) {
  return (
    <svg
      className={className}
      width="53"
      height="53"
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_240_82)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M27.8374 0.438858C27.3395 0.151417 26.7748 9.15527e-05 26.1999 9.15527e-05C25.625 9.15527e-05 25.0603 0.151417 24.5624 0.438858L4.9124 12.1535C4.41455 12.441 4.00113 12.8544 3.71369 13.3522C3.42625 13.8501 3.27492 14.4148 3.2749 14.9897V37.4103C3.27492 37.9852 3.42625 38.5499 3.71369 39.0478C4.00113 39.5456 4.41455 39.959 4.9124 40.2465L24.5624 51.9612C25.0603 52.2486 25.625 52.3999 26.1999 52.3999C26.7748 52.3999 27.3395 52.2486 27.8374 51.9612L47.4874 40.2465C47.9853 39.959 48.3987 39.5456 48.6861 39.0478C48.9736 38.5499 49.1249 37.9852 49.1249 37.4103V14.9897C49.1249 14.4148 48.9736 13.8501 48.6861 13.3522C48.3987 12.8544 47.9853 12.441 47.4874 12.1535L27.8374 0.438858Z"
          fill="#F2C53D"
        />
      </g>
      <defs>
        <clipPath id="clip0_240_82">
          <rect width="52.4" height="52.4" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
