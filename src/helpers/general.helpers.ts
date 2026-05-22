import type { League } from '../types';

export const getUniqueSports = (leagues: League[]): string[] => {
  const uniqueSports = new Set(
    leagues
      .map(league => league.strSport)
      .filter(Boolean)
  );
  
  return Array.from(uniqueSports).sort();
};

export const filterLeagues = (
  leagues: League[],
  searchTerm: string = '',
  sport: string = 'all'
): League[] => {
  return leagues.filter(league => {
    const matchesSearch = !searchTerm || 
      league.strLeague?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      league.strLeagueAlternate?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSport = sport === 'all' || league.strSport === sport;
    
    return matchesSearch && matchesSport;
  });
};