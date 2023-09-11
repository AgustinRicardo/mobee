interface Props {
  className?: string;
}
export default function LeftArrow({ className }: Props) {
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
        d="m12.3 15.3l-2.6-2.6q-.15-.15-.225-.325T9.4 12q0-.2.075-.375T9.7 11.3l2.6-2.6q.475-.475 1.088-.212t.612.937v5.15q0 .675-.613.938T12.3 15.3Z"
      />
    </svg>
  );
}
