const brandName = "Adair Systems";
const navigationItems = [
  { label: "Home", target: "home" },
  { label: "Work", target: "featured-architecture" },
  { label: "Capabilities", target: "capabilities" },
  { label: "Method", target: "methodology" }
];
function BrandLogo() {
  return (
    <a
      className="group flex items-center gap-3 outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-[#1FB6A6]/60"
      href="#home"
      aria-label={`${brandName} home`}
    >
      <div className="brand-mark">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          strokeWidth={2} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          width="23" height="23"
          aria-hidden="true"
        >
          <defs>
            {/* Gradient exclusively for the connecting lines */}
            <linearGradient id="connecting-lines" x1="5" y1="0" x2="19" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1FB6A6" />
              <stop offset="50%" stopColor="#9B84F5" />
              <stop offset="100%" stopColor="#7C5CF0" />
            </linearGradient>

            {/* Dedicated Diagonal Gradient for the Top Box */}
            <linearGradient id="top-box-gradient" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#1FB6A6" /> {/* Top Left: Meridian Teal */}
              <stop offset="100%" stopColor="#7C5CF0" /> {/* Bottom Right: Ion Violet */}
            </linearGradient>
          </defs>
          
          {/* Bottom Left Box: Meridian Teal */}
          <rect x="2" y="16" width="6" height="6" rx="1" stroke="#1FB6A6" />
          
          {/* Bottom Right Box: Ion Violet */}
          <rect x="16" y="16" width="6" height="6" rx="1" stroke="#7C5CF0" />
          
          {/* Top Box: Diagonal Mint-to-Purple Gradient */}
          <rect x="9" y="2" width="6" height="6" rx="1" stroke="url(#top-box-gradient)" />
          
          {/* Horizontal Connecting Line: Mint to Purple Gradient */}
          <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" stroke="url(#connecting-lines)" />
          
          {/* Vertical Connecting Line: Violet tint */}
          <path d="M12 12V8" stroke="#9B84F5" />
        </svg>
      </div>

      <span className="brand-name">Adair Systems</span>
    </a>
  );
}


export function Navbar() {
  return <header className="site-header">
    <nav className="nav-shell" aria-label="Primary navigation">
      <BrandLogo />
      <div className="nav-sections">
        {navigationItems.map(item => <a key={item.target} href={`#${item.target}`}>{item.label}</a>)}
      </div>
      <div className="nav-socials">
        <a href="https://github.com/adairclark-design" aria-label="GitHub"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></a>
        <a href="https://www.linkedin.com/in/adair-clark-0380b9239" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
      </div>
      <a className="nav-cta btn" href="mailto:hello@adair.systems">Contact</a>
    </nav>
  </header>;
}
