import React, { useState } from 'react';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo: React.FC<AppLogoProps> = ({ className = '', size = 36 }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {!imgError ? (
        <img
          src="/logo.png"
          alt="Logo Quincaillerie & Portes"
          width={size}
          height={size}
          className="rounded-lg object-contain"
          onError={() => setImgError(true)}
          style={{ width: size, height: size }}
        />
      ) : null}

      {/* Fallback architectural hardware emblem rendered if logo.png is not yet present */}
      {imgError && (
        <div
          className="flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-600 to-slate-900 border border-cyan-400/30 text-white shadow-md shadow-cyan-950/50"
          style={{ width: size, height: size }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3/5 h-3/5 text-cyan-200"
          >
            {/* Door Frame & Door */}
            <rect x="3" y="3" width="13" height="18" rx="1.5" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            {/* Hinge marks */}
            <line x1="3" y1="7" x2="3" y2="9" strokeWidth="2.5" stroke="#fbbf24" />
            <line x1="3" y1="15" x2="3" y2="17" strokeWidth="2.5" stroke="#fbbf24" />
            {/* Swing indicator arc */}
            <path d="M16 5c3 2 4.5 5 4.5 7s-1.5 5-4.5 7" stroke="#38bdf8" strokeDasharray="2 2" />
          </svg>
        </div>
      )}
    </div>
  );
};
