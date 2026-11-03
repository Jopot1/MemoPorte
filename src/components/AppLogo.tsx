import React, { useState } from 'react';

interface AppLogoProps {
  className?: string;
  size?: number;
  zoom?: number; // Facteur de zoom (ex: 1.3 = 30% plus grand dans le cadre)
}

export const AppLogo: React.FC<AppLogoProps> = ({
  className = '',
  size = 36,
  zoom = 1.25,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 overflow-hidden rounded-xl ${className}`}
      style={{ width: size, height: size }}
    >
      {!imgError ? (
        <img
          src="/logo.png"
          alt="Logo Quincaillerie & Portes"
          width={size}
          height={size}
          className="w-full h-full object-contain select-none pointer-events-none transition-transform"
          onError={() => setImgError(true)}
          style={{
            transform: zoom ? `scale(${zoom})` : undefined,
            transformOrigin: 'center center',
          }}
        />
      ) : (
        /* Fallback architectural hardware emblem rendered if logo.png is missing or fails */
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-600 to-slate-900 border border-blue-400/30 text-white shadow-xs">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3/5 h-3/5 text-blue-200"
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
