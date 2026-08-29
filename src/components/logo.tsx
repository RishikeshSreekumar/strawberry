export function StrawberryLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M16 1.5c-.4 1.1-.3 2.2.5 3.2"
        fill="none"
        stroke="#4CA154"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10 6C12 4.5 14 4 16 4s4 .5 6 2c-1.5 1.8-3.6 2.8-6 2.8S11.5 7.8 10 6Z"
        fill="#4CA154"
      />
      <path
        d="M16 29C9.5 25.5 5.5 20 5.5 14.5 5.5 10.9 8.4 8 12 8h8c3.6 0 6.5 2.9 6.5 6.5C26.5 20 22.5 25.5 16 29Z"
        fill="currentColor"
      />
      <g fill="#FFE4E9">
        <ellipse cx="11.5" cy="13.5" rx=".85" ry="1.15" />
        <ellipse cx="16" cy="12.6" rx=".85" ry="1.15" />
        <ellipse cx="20.5" cy="13.5" rx=".85" ry="1.15" />
        <ellipse cx="13.4" cy="17.6" rx=".85" ry="1.15" />
        <ellipse cx="18.6" cy="17.6" rx=".85" ry="1.15" />
        <ellipse cx="16" cy="21.8" rx=".85" ry="1.15" />
      </g>
    </svg>
  );
}
