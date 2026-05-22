import React from 'react';
import LeagueItem from './LeagueItem.tsx';
import type { LeagueListProps, League } from '../types/index.ts';

const LeagueList: React.FC<LeagueListProps> = ({ 
  leagues, 
  onLeagueClick, 
  onLeagueHover 
}) => {
  if (leagues.length === 0) {
    return (
      <div className="no-results">
        <p>No leagues found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="league-list">
      {leagues.map((league: League) => (
        <LeagueItem 
          key={league.idLeague} 
          league={league} 
          onClick={() => onLeagueClick(league)}
          onHover={onLeagueHover ? () => onLeagueHover(league) : undefined}
        />
      ))}
    </div>
  );
};

export default LeagueList;