// League Types
export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string;
}

// Season Badge Types
export interface SeasonBadge {
  strSeason?: string;
  strBadge?: string;
}

// API Response Types
export interface AllLeaguesResponse {
  leagues: League[];
}

export interface SeasonBadgesResponse {
  seasons: SeasonBadge[];
}

// Component Props Types
export interface SearchBarProps {
  value: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export interface SportFilterProps {
  sports: string[];
  selectedSport: string;
  onSportChange: (sport: string) => void;
}

export interface LeagueItemProps {
  league: League;
  onClick: () => void;
  onHover?: () => void;
}

export interface LeagueListProps {
  leagues: League[];
  onLeagueClick: (league: League) => void;
  onLeagueHover?: (league: League) => void;
}

export interface SeasonBadgeModalProps {
  league: League;
  badge: SeasonBadge | null;
  onClose: () => void;
}

// Cache Types
export interface BadgeCache {
  [leagueId: string]: SeasonBadge[];
}

