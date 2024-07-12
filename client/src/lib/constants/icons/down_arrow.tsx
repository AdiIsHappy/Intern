export function Arrow({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 ml-3 transition-transform ${
        open ? "rotate-180" : "rotate-0"
      }`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  );
}
