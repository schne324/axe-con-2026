import IconButton from '../shared/IconButton'

const TrainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="32"
    height="32"
    fill="none"
  >
    {/* Locomotive body */}
    <rect x="4" y="20" width="32" height="16" rx="3" fill="white" opacity="0.9" />
    {/* Cab */}
    <rect x="28" y="14" width="10" height="22" rx="2" fill="white" opacity="0.85" />
    {/* Smokestack */}
    <rect x="30" y="9" width="4" height="7" rx="1" fill="white" opacity="0.8" />
    {/* Smoke puff */}
    <circle cx="32" cy="7" r="3" fill="white" opacity="0.4" />
    <circle cx="35" cy="5" r="2" fill="white" opacity="0.3" />
    {/* Wheels */}
    <circle cx="12" cy="36" r="5" fill="#1a2e4a" stroke="white" strokeWidth="2" />
    <circle cx="26" cy="36" r="5" fill="#1a2e4a" stroke="white" strokeWidth="2" />
    <circle cx="38" cy="36" r="4" fill="#1a2e4a" stroke="white" strokeWidth="1.5" />
    {/* Window on cab */}
    <rect x="30" y="16" width="5" height="4" rx="1" fill="#1a2e4a" opacity="0.6" />
    {/* Cowcatcher */}
    <path d="M4 30 L0 36 L6 36 L4 30Z" fill="white" opacity="0.7" />
    {/* Connecting rod */}
    <line x1="7" y1="33" x2="31" y2="33" stroke="#1a2e4a" strokeWidth="1.5" opacity="0.4" />
  </svg>
)

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width="18"
    height="18"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8.5" cy="8.5" r="5.5" />
    <line x1="13" y1="13" x2="18" y2="18" />
  </svg>
)

export default function Navbar() {
  return (
    <nav className="bg-[#1a2e4a] text-white px-6 py-3 flex items-center justify-between">
      <a href="#" className="flex items-center gap-2 text-white no-underline">
        <TrainIcon />
        <span className="text-lg font-semibold tracking-wide">CJ Railway Co.</span>
      </a>

      <div className="flex items-center gap-1 bg-white/10 rounded-lg px-3 py-1.5">
        <input
          type="text"
          placeholder="Search"
          aria-label="{LABEL TEXT HERE}"
          className="bg-transparent text-white placeholder-white/60 text-sm outline-none w-48"
        />
        <IconButton icon={<SearchIcon />} />
      </div>
    </nav>
  )
}
