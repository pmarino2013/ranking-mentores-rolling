const MedalIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="medal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#facc15" />
      </linearGradient>
      <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
    <path d="M15 4h12l5 16h-9l-8-16z" fill="url(#ribbon)" opacity="0.95" />
    <path d="M49 4H37l-5 16h9l8-16z" fill="url(#ribbon)" opacity="0.8" />
    <circle
      cx="32"
      cy="41"
      r="19"
      fill="url(#medal)"
      stroke="#fde68a"
      strokeWidth="2"
    />
    <path
      d="M32 27l3.9 7.9 8.7 1.3-6.3 6.1 1.5 8.7L32 47.5l-7.8 4.1 1.5-8.7-6.3-6.1 8.7-1.3L32 27z"
      fill="#fef3c7"
    />
  </svg>
);

export default MedalIcon;
