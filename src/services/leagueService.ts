import { API_ENDPOINTS } from './apiConfig';
import type { 
  League, 
  SeasonBadge,
  SeasonBadgesResponse,  
} from '../types';

// use Cache api for theese as module expands, to have storage when browser is closed or offline usages
const badgeCache = new Map<string, SeasonBadge | null>()
const leagueListCache = new Map<string, League[]>();

export const fetchAllLeagues = async (): Promise<League[]> => {
  const cacheKey = 'all_leagues';
  
  // Check cache first
  if (leagueListCache.has(cacheKey)) {
    console.log('Returning leagues from cache');
    return leagueListCache.get(cacheKey) || [];
  }

  try {
    console.log('Fetching leagues from API...');
    const response = await fetch(API_ENDPOINTS.ALL_LEAGUES);
    const data = await response.json();
    const leagues = data.leagues || [];
    
    // Cache the result
    leagueListCache.set(cacheKey, leagues);
    
    return leagues;
  } catch (error) {
    console.error('Failed to fetch leagues:', error);
    throw new Error('Unable to load leagues. Please try again later.');
  }
};


export const fetchSeasonBadges = async (leagueId: string): Promise<SeasonBadge | null> => {
  if (!leagueId) {
    throw new Error('League ID is required');
  }

  const cacheKey = `badges_${leagueId}`;
  
  // Check cache first
  if (badgeCache.has(cacheKey)) {
    console.log(`Returning badges for league ${leagueId} from cache`);
    const cached = badgeCache.get(cacheKey);
    return cached === undefined ? null : cached;
  }

  try {
    console.log(`Fetching badges for league ${leagueId} from API...`);
    const response = await fetch(
      API_ENDPOINTS.SEASON_BADGES(leagueId)
    );
    const data: SeasonBadgesResponse = await response.json();
    const badges = data.seasons || [];
    const badgeToDisplay = badges.find((badge: SeasonBadge) => badge.strBadge) || badges[0];
    // Cache the result
    badgeCache.set(cacheKey, badgeToDisplay);
    
    return badgeToDisplay;
  } catch (error) {
    console.error(`Failed to fetch badges for league ${leagueId}:`, error);
    return null;
  }
};

export const prefetchSeasonBadges = async (
  leagueId: string
): Promise<SeasonBadge | null> => {
  if (!leagueId) return null;

  const cacheKey = `badges_${leagueId}`;
  
  // Skip if already cached
  if (badgeCache.has(cacheKey)) {
    const cached = badgeCache.get(cacheKey) || null;
    return cached;
  }

  try {
    const badge = await fetchSeasonBadges(leagueId);
    return badge;
  } catch (error) {
    console.debug(`Prefetch failed for league ${leagueId}:`, error);
    return null;
  }
};
