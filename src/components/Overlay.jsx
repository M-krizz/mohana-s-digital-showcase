import React, { useState } from 'react';

export default function Overlay() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioOn, setAudioOn] = useState(true);
  const [showAwards, setShowAwards] = useState(false);

  return (
    <div className="overlay">
      <div className="overlay-top-bar">
        <div className="overlay-brand">MK.</div>
        <div className="overlay-controls">
          <button
            type="button"
            className="overlay-control"
            aria-pressed={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="control-icon">
              <line x1="5" y1="7" x2="19" y2="7" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="5" y1="17" x2="19" y2="17" />
            </svg>
          </button>
          <button
            type="button"
            className="overlay-control"
            aria-pressed={audioOn}
            aria-label="Toggle audio"
            onClick={() => setAudioOn((prev) => !prev)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="control-icon">
              <path d="M4 10h4l4-3v10l-4-3H4z" />
              <path d="M16 9c1.6 1.6 1.6 4.4 0 6" />
            </svg>
          </button>
          <button
            type="button"
            className="overlay-control"
            aria-pressed={showAwards}
            aria-label="Toggle awards"
            onClick={() => setShowAwards((prev) => !prev)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="control-icon">
              <path d="M7 5h10v3a4 4 0 0 1-3 3.8V14h2v2H8v-2h2v-2.2A4 4 0 0 1 7 8z" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}
