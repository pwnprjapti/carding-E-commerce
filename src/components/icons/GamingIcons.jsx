import React from 'react';

// 3D Metallic BGMI UC Coin
export function UcCoinIcon({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ucCoinGold" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="25%" stopColor="#FCD34D" />
          <stop offset="65%" stopColor="#F59E0B" />
          <stop offset="90%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </radialGradient>
        <linearGradient id="ucCoinRim" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        <linearGradient id="ucTextGrad" x1="0" y1="0" x2="0" y2="100">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
        <filter id="ucGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Outer Glow Ring */}
      <circle cx="50" cy="50" r="46" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.6" filter="url(#ucGlow)" />
      
      {/* Outer Coin Base */}
      <circle cx="50" cy="50" r="44" fill="url(#ucCoinRim)" />
      
      {/* Inner Bevel */}
      <circle cx="50" cy="50" r="39" fill="url(#ucCoinGold)" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#FDE68A" strokeWidth="1.5" opacity="0.8" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="#B45309" strokeWidth="1" opacity="0.9" />

      {/* Hexagon Pattern Overlay */}
      <polygon points="50,22 72,34 72,66 50,78 28,66 28,34" fill="none" stroke="#FBBF24" strokeWidth="1.5" opacity="0.4" />

      {/* Center UC Text */}
      <text x="50" y="58" textAnchor="middle" fill="url(#ucTextGrad)" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="24" letterSpacing="-0.5" filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.8))">
        UC
      </text>

      {/* Glossy Curved Coin Sheen Accent */}
      <ellipse cx="42" cy="28" rx="10" ry="4" transform="rotate(-30 42 28)" fill="#FFFFFF" opacity="0.75" />
    </svg>
  );
}

// 3D UC Coins Stack (For Medium Packs)
export function UcStackIcon({ className = "w-16 h-16" }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <div className="absolute -left-2 top-2 rotate-[-12deg] scale-90">
        <UcCoinIcon className="w-12 h-12" />
      </div>
      <div className="absolute -right-2 top-2 rotate-[12deg] scale-90">
        <UcCoinIcon className="w-12 h-12" />
      </div>
      <div className="relative z-10 scale-110 drop-shadow-2xl">
        <UcCoinIcon className="w-14 h-14" />
      </div>
    </div>
  );
}

// 3D UC Crate / Treasure Box (For Big Packs)
export function UcCrateIcon({ className = "w-20 h-20" }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crateBody" x1="0" y1="0" x2="120" y2="120">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="50%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        <linearGradient id="crateMetal" x1="0" y1="0" x2="120" y2="0">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Crate Base Shadow */}
      <ellipse cx="60" cy="105" rx="45" ry="10" fill="#000" opacity="0.5" />

      {/* Crate Main Body */}
      <rect x="20" y="40" width="80" height="60" rx="8" fill="url(#crateBody)" stroke="#F59E0B" strokeWidth="2" />
      
      {/* Metal Straps */}
      <rect x="30" y="40" width="10" height="60" fill="url(#crateMetal)" />
      <rect x="80" y="40" width="10" height="60" fill="url(#crateMetal)" />
      <rect x="20" y="65" width="80" height="10" fill="url(#crateMetal)" />

      {/* Overflowing UC Coins at Lid */}
      <g transform="translate(35, 18) scale(0.55)">
        <UcCoinIcon className="w-16 h-16" />
      </g>
      <g transform="translate(55, 12) scale(0.65)">
        <UcCoinIcon className="w-16 h-16" />
      </g>

      {/* Lock Plate */}
      <rect x="52" y="60" width="16" height="20" rx="3" fill="#FDE68A" stroke="#78350F" strokeWidth="1.5" />
      <circle cx="60" cy="68" r="3" fill="#451A03" />

      {/* Glow Particles */}
      <circle cx="25" cy="30" r="2.5" fill="#FDE68A" className="animate-pulse" opacity="0.8" />
      <circle cx="95" cy="25" r="2" fill="#FDE68A" className="animate-pulse" opacity="0.8" />
    </svg>
  );
}

// 3D Air Drop Crate (For Mega / Ultimate Packs)
export function AirDropCrateIcon({ className = "w-20 h-20" }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="airDropRed" x1="0" y1="0" x2="0" y2="120">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id="airDropBlue" x1="0" y1="0" x2="120" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>

      {/* Parachute / Flare glow */}
      <circle cx="60" cy="60" r="50" fill="#EF4444" opacity="0.15" filter="blur(10px)" />

      {/* Top Blue Tarp Cover */}
      <path d="M15 45 Q60 30 105 45 L95 25 Q60 15 25 25 Z" fill="url(#airDropBlue)" stroke="#60A5FA" strokeWidth="1.5" />

      {/* Red Container Body */}
      <rect x="25" y="45" width="70" height="55" rx="6" fill="url(#airDropRed)" stroke="#FCA5A5" strokeWidth="1.5" />
      
      {/* Black Frame Ribs */}
      <rect x="25" y="45" width="70" height="8" fill="#111827" />
      <rect x="25" y="92" width="70" height="8" fill="#111827" />
      <rect x="25" y="45" width="10" height="55" fill="#111827" />
      <rect x="85" y="45" width="10" height="55" fill="#111827" />
      <rect x="55" y="45" width="10" height="55" fill="#111827" />

      {/* UC Symbol Emblem */}
      <circle cx="60" cy="72" r="12" fill="#F59E0B" stroke="#FDE68A" strokeWidth="1.5" />
      <text x="60" y="77" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial Black" fontWeight="900" fontSize="11">UC</text>
    </svg>
  );
}

// PhonePe Logo SVG
export function PhonePeLogo({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="22" fill="#5F259F" />
      <path d="M68 30H45C38 30 33 35 33 42V75H43V58H56L68 75H80 L66 56C73 54 78 48 78 41C78 35 73 30 68 30ZM43 49V39H63C66 39 68 41 68 44C68 47 66 49 63 49H43Z" fill="white" />
    </svg>
  );
}

// Google Pay Logo SVG
export function GooglePayLogo({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="22" fill="#FFFFFF" />
      <path d="M44.5 44.7V54.4H59.2C58.6 57.6 55.4 63.6 44.5 63.6C35.1 63.6 27.4 55.8 27.4 46.4C27.4 37 35.1 29.2 44.5 29.2C49.9 29.2 53.5 31.5 55.5 33.4 L63.2 26C58.3 21.4 52 18.6 44.5 18.6C29.1 18.6 16.6 31.1 16.6 46.4C16.6 61.7 29.1 74.2 44.5 74.2C60.6 74.2 71.3 62.9 71.3 46.9C71.3 44.8 71.1 43.4 70.8 41.7H44.5V44.7Z" fill="#4285F4" />
      <path d="M73.5 37.8H80.5V44.8H73.5V37.8Z" fill="#34A853" />
      <path d="M73.5 48.8H80.5V55.8H73.5V48.8Z" fill="#FBBC05" />
      <path d="M83.5 37.8H90.5V44.8H83.5V37.8Z" fill="#EA4335" />
    </svg>
  );
}

// Paytm Logo SVG
export function PaytmLogo({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="22" fill="#002E6E" />
      <path d="M22 65V35H32C37 35 40 37 40 41C40 45 37 47 32 47H28V65H22ZM28 42H32C34 42 35 41 35 41C35 40 34 39 32 39H28V42Z" fill="#00BAF2" />
      <path d="M42 65V47H38V42H48V65H42Z" fill="white" />
      <path d="M52 65L62 35H69L59 65H52Z" fill="#00BAF2" />
      <path d="M68 65V35H78C83 35 86 37 86 41C86 45 83 47 78 47H74V65H68ZM74 42H78C80 42 81 41 81 41C81 40 80 39 78 39H74V42Z" fill="white" />
    </svg>
  );
}

// BHIM UPI Official Brand Logo SVG
export function UpiBrandLogo({ className = "w-10 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="50" rx="10" fill="#0F172A" stroke="#334155" strokeWidth="1" />
      <path d="M25 12L45 12L35 38L15 38L25 12Z" fill="#008632" />
      <path d="M38 12L58 12L48 38L28 38L38 12Z" fill="#FF7900" />
      <text x="65" y="32" fill="#FFFFFF" fontStyle="italic" fontWeight="900" fontSize="18" fontFamily="Arial Black">
        UPI
      </text>
    </svg>
  );
}

// Official BGMI Crest Shield Logo SVG
export function BgmiCrestLogo({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crestGrad" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>

      {/* Outer Shield */}
      <path d="M50 5 L85 20 V50 C85 72 50 95 50 95 C50 95 15 72 15 50 V20 L50 5 Z" fill="url(#crestGrad)" stroke="#FDE68A" strokeWidth="2.5" />
      <path d="M50 12 L78 24 V48 C78 66 50 85 50 85 C50 85 22 66 22 48 V24 L50 12 Z" fill="#0F172A" />

      {/* Center Helmet Silhouette */}
      <path d="M35 45 C35 35 42 30 50 30 C58 30 65 35 65 45 V55 H35 V45 Z" fill="#F59E0B" />
      <rect x="40" y="48" width="20" height="3" rx="1.5" fill="#0F172A" />
      
      {/* Crown Crest Chevron */}
      <path d="M46 22 L50 17 L54 22 L50 20 Z" fill="#FDE68A" />
    </svg>
  );
}

// Verified Anti-Ban Badge SVG
export function VerifiedShieldBadge({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 6V11C3 16.5 7 21.4 12 22C17 21.4 21 16.5 21 11V6L12 2Z" fill="#10B981" stroke="#A7F3D0" strokeWidth="1.5" />
      <path d="M8.5 11.5L11 14L16 9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Instant 12-Hours Clock Badge SVG
export function DeliveryClockBadge({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" fill="#F59E0B" opacity="0.2" stroke="#F59E0B" strokeWidth="1.5" />
      <path d="M12 7V12L15 15" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="#FDE68A" />
    </svg>
  );
}
