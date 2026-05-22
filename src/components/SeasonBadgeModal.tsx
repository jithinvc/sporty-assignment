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
        
        {!badge ? (
          <div className="modal-loading">
            <p>Loading badge...</p>
          </div>
        ) : badge?.strBadge ? (
          <div className="badge-container">
            <img 
              src={badge.strBadge} 
              className="season-badge"
            />
            {badge.strSeason && (
              <p className="badge-season">Season: {badge.strSeason}</p>
            )}
          </div>
        ) : (
          <div className="no-badge">
            <p>No season badge available for this league.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonBadgeModal;