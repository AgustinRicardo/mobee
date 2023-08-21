interface Props {
  className: string;
}
export default function ToWatchIcon({ className }: Props) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 16v-2h7v2H3Zm0-4v-2h11v2H3Zm0-4V6h11v2H3Zm13 12v-4h-4v-2h4v-4h2v4h4v2h-4v4h-2Z"
      />
    </svg>
  );
}
