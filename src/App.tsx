import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import LeagueList from './components/LeagueList';
import SearchBar from './components/SearchBar';
import SportFilter from './components/SportFilter';
import { useDebounce } from './hooks/useDebounce';
import { 
  fetchAllLeagues, 
  fetchSeasonBadges, 
  prefetchSeasonBadges,
} from './services/leagueService';
import {
  getUniqueSports,
  filterLeagues
} from './helpers/general.helpers';
import type { League, SeasonBadge } from './types';

import './App.css';

const SeasonBadgeModal = lazy(() => import('./components/SeasonBadgeModal'));

const App: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  
  const [currentBadge, setCurrentBadge] = useState<SeasonBadge | null>(null);
  const [modalPrefetched, setModalPrefetched] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    loadLeagues();
  }, []);

  const loadLeagues = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllLeagues();
      setLeagues(data);
    } catch (err) {
      setError('Failed to fetch leagues. Please try again.');
      console.error('Error loading leagues:', err);
    } finally {
      setLoading(false);
    }
  };

  const sports = useMemo(() => {
    return getUniqueSports(leagues);
  }, [leagues]);

  const filteredLeagues = useMemo(() => {
    return filterLeagues(leagues, debouncedSearchTerm, selectedSport);
  }, [leagues, debouncedSearchTerm, selectedSport]);

  // Prefetch badge data on hover, preLoad image and load modal chunk (for instant loading on click)
  const handleLeagueHover = useCallback(async (league: League): Promise<void> => {
    if (!modalPrefetched) {
      import('./components/SeasonBadgeModal').catch(err => {
        console.debug('Modal prefetch failed:', err);
      });
      setModalPrefetched(true);
    }
    
    try {
      const badgeToDisplay = await prefetchSeasonBadges(league.idLeague);
      
      // Preload badge images
    if (badgeToDisplay?.strBadge) {
        const img = new Image();
        img.src = badgeToDisplay.strBadge;
      }
    } catch (err) {
      console.debug('Prefetch error:', err);
    }
  }, [modalPrefetched]);

  const handleLeagueClick = useCallback(async (league: League): Promise<void> => {
    setSelectedLeague(league);

    // Fetch badge data if not cached
    try {
      const badgeToDisplay = await fetchSeasonBadges(league.idLeague);
      
       if (badgeToDisplay?.strBadge) {
        const img = new Image();
        img.src = badgeToDisplay.strBadge; // Preload badge image for modal
      }
      
      setCurrentBadge(badgeToDisplay);
    } catch (err) {
      console.error('Error fetching badges:', err);
      setCurrentBadge(null);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedLeague(null);
    setCurrentBadge(null);
  }, []);


  const renderFilters = () => {
    return (
      <div className="filters-container">
        <SearchBar 
          value={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search leagues..."
        />
        <SportFilter 
          sports={sports}
          selectedSport={selectedSport}
          onSportChange={setSelectedSport}
        />
      </div>
    );
  };

  const renderLoading = (): React.ReactNode => {
    if (!loading) return null;
    
    return (
      <div className="loading">
        <p>Loading leagues...</p>
      </div>
    );
  };

  const renderError = (): React.ReactNode => {
    if (!error) return null;
    
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={loadLeagues} className="retry-button">
          Retry
        </button>
      </div>
    );
  };

  const renderLeagueList = () => {
    return <LeagueList leagues={filteredLeagues} onLeagueClick={handleLeagueClick} onLeagueHover={handleLeagueHover} />;
  };

  const renderSelectedLeagueModal = () => {
    if (!selectedLeague) return null;
    
    return (
      <Suspense fallback={
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-loading">
              <p>Loading...</p>
            </div>
          </div>
        </div>
      }>
        <SeasonBadgeModal
          league={selectedLeague}
          badge={currentBadge}
          onClose={handleCloseModal}
        />
      </Suspense>
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sports Leagues</h1>
      </header>
      {renderFilters()}
      {renderLoading()}
      {renderError()}
      {!loading && !error && renderLeagueList()}
      {renderSelectedLeagueModal()}
    </div>
  );
}

export default App;