import React, { memo } from 'react';
import type { LeagueItemProps } from '../types';

const LeagueItem: React.FC<LeagueItemProps> = memo(({ league, onClick, onHover }) => {

  return (
    <div 
      className="league-item" 
      onClick={onClick} 
      role="button" 
      tabIndex={0}
      onMouseEnter={onHover}
    >
      <div className="league-info">
        <div className="league-name">{league.strLeague}</div>
        {league.strLeagueAlternate && (
          <div className="league-alternate">
            {league.strLeagueAlternate}
          </div>
        )}
      </div>
      
      <span className="sport-badge">{league.strSport}</span>
      
      <span className="click-hint">
        View badge →
      </span>
    </div>
  );
});

LeagueItem.displayName = 'LeagueItem';

export default LeagueItem;