import React from 'react';

export const LatkanTassels: React.FC = () => {
  return (
    <>
      {/* Top Left Swaying Latkan */}
      <div className="fixed top-0 left-2 sm:left-6 z-20 pointer-events-none animate-latkan">
        <svg width="42" height="150" viewBox="0 0 42 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
          {/* Gold Hanging Cord */}
          <line x1="21" y1="0" x2="21" y2="40" stroke="#D4AF37" strokeWidth="2" strokeDasharray="2 1" />
          
          {/* Top Gold Bead Ring */}
          <circle cx="21" cy="42" r="5" fill="#D4AF37" stroke="#AA7C11" strokeWidth="1" />
          <circle cx="21" cy="54" r="7" fill="#7A1F2D" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="21" cy="67" r="4.5" fill="#D4AF37" stroke="#AA7C11" strokeWidth="1" />
          
          {/* Main Velvet Bell Dome (Jhumka / Latkan Dome) */}
          <path
            d="M8 88C8 76 34 76 34 88C34 94 8 94 8 88Z"
            fill="#4A0E17"
            stroke="#D4AF37"
            strokeWidth="1.5"
          />
          {/* Gold Scallop Trimmings */}
          <path d="M10 93Q15 97 21 93Q27 97 32 93" stroke="#FFF3B0" strokeWidth="1.5" fill="none" />
          
          {/* Silk Fringe Tassels Hanging Down */}
          <line x1="12" y1="95" x2="10" y2="135" stroke="#7A1F2D" strokeWidth="1.5" />
          <line x1="16" y1="95" x2="15" y2="142" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="21" y1="95" x2="21" y2="148" stroke="#4A0E17" strokeWidth="2" />
          <line x1="26" y1="95" x2="27" y2="142" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="30" y1="95" x2="32" y2="135" stroke="#7A1F2D" strokeWidth="1.5" />
          
          {/* Tiny Gold Hanging Pearls */}
          <circle cx="10" cy="136" r="2" fill="#D4AF37" />
          <circle cx="15" cy="143" r="2.2" fill="#FFF3B0" />
          <circle cx="21" cy="149" r="2.5" fill="#D4AF37" />
          <circle cx="27" cy="143" r="2.2" fill="#FFF3B0" />
          <circle cx="32" cy="136" r="2" fill="#D4AF37" />
        </svg>
      </div>

      {/* Top Right Swaying Latkan (Phase Offset) */}
      <div
        className="fixed top-0 right-2 sm:right-6 z-20 pointer-events-none animate-latkan"
        style={{ animationDelay: '-1.75s' }}
      >
        <svg width="42" height="150" viewBox="0 0 42 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
          {/* Gold Hanging Cord */}
          <line x1="21" y1="0" x2="21" y2="40" stroke="#D4AF37" strokeWidth="2" strokeDasharray="2 1" />
          
          {/* Top Gold Bead Ring */}
          <circle cx="21" cy="42" r="5" fill="#D4AF37" stroke="#AA7C11" strokeWidth="1" />
          <circle cx="21" cy="54" r="7" fill="#7A1F2D" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="21" cy="67" r="4.5" fill="#D4AF37" stroke="#AA7C11" strokeWidth="1" />
          
          {/* Main Velvet Bell Dome */}
          <path
            d="M8 88C8 76 34 76 34 88C34 94 8 94 8 88Z"
            fill="#4A0E17"
            stroke="#D4AF37"
            strokeWidth="1.5"
          />
          {/* Gold Scallop Trimmings */}
          <path d="M10 93Q15 97 21 93Q27 97 32 93" stroke="#FFF3B0" strokeWidth="1.5" fill="none" />
          
          {/* Silk Fringe Tassels Hanging Down */}
          <line x1="12" y1="95" x2="10" y2="135" stroke="#7A1F2D" strokeWidth="1.5" />
          <line x1="16" y1="95" x2="15" y2="142" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="21" y1="95" x2="21" y2="148" stroke="#4A0E17" strokeWidth="2" />
          <line x1="26" y1="95" x2="27" y2="142" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="30" y1="95" x2="32" y2="135" stroke="#7A1F2D" strokeWidth="1.5" />
          
          {/* Tiny Gold Hanging Pearls */}
          <circle cx="10" cy="136" r="2" fill="#D4AF37" />
          <circle cx="15" cy="143" r="2.2" fill="#FFF3B0" />
          <circle cx="21" cy="149" r="2.5" fill="#D4AF37" />
          <circle cx="27" cy="143" r="2.2" fill="#FFF3B0" />
          <circle cx="32" cy="136" r="2" fill="#D4AF37" />
        </svg>
      </div>
    </>
  );
};
