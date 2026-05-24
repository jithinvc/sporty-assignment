import React from 'react';
import type { SeasonBadgeModalProps } from '../types';

const SeasonBadgeModal: React.FC<SeasonBadgeModalProps> = ({ 
  league, 
  badge, 
  onClose 
}) => {
  
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button 
          className="modal-close" 
          onClick={onClose} 
          aria-label="Close modal"
        >
          ✕
        </button>
        
        <h2 className="modal-title">{league.strLeague}</h2>
        <p className="modal-sport">{league.strSport}</p>
        
        <div className="badge-area">
          {!badge ? (
            <p className="badge-loading-text">Loading...</p>
          ) : badge.strBadge ? (
            <img
              src={badge.strBadge}
              className="season-badge"
              alt={`${league.strLeague} badge`}
            />
          ) : (
            <p className="no-badge-text">No season badge available for this league.</p>
          )}
        </div>

        <p className="badge-season">
          {badge?.strSeason ? `Season: ${badge.strSeason}` : ''}
        </p>
      </div>
    </div>
  );
};

export default SeasonBadgeModal;