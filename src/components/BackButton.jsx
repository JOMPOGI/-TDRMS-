import React from 'react';

export default function BackButton({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="nav-back"
      aria-label="Go back"
      type="button"
    >
      ← Back
    </button>
  );
} 