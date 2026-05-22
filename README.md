# Sporty Group Assignment

## Overview
Build a single-page application (SPA) that consumes the All Leagues API and displays sports leagues with filtering options.

### Features
- Fetch and display a list of sports leagues
- Display the following fields:
  - `strLeague` (League name)
  - `strSport` (Sport type)
  - `strLeagueAlternate` (Alternative league name)
- Search bar to filter leagues by name
- Dropdown to filter by sport type (e.g., Soccer, Basketball, Motorsport)
- Click on league to view season badge in modal

### Technical Requirements
- Component-based architecture
- Responsive UI (functional priority, visual enhancements if time allows)
- API response caching to avoid repeat calls

---

## Architecture

### Components

- **App** - Container component managing filtering, league list, and modal state
- **SearchBar** - Search input component for filtering leagues by name
- **SportFilter** - Dropdown component for filtering leagues by sport type
- **LeagueList** - Displays the list of league items returned by the API
- **LeagueItem** - Individual league list item component
- **SeasonBadgeModal** - Modal component to display the season badge for a selected league

### Services

Contains API functions for fetching league data and badges:
- `fetchAllLeagues` - Fetches the complete list of sports leagues
- `fetchSeasonBadges` - Fetches season badge data for a specific league

### Helpers

Utility functions for data processing:
- `getUniqueSports` - Extracts unique sport types from the leagues API response
- `filterLeagues` - Filters leagues based on search term and selected sport

### Types

TypeScript interfaces and types for type safety across the application.

### Hooks

- `useDebounce` - Custom hook for debouncing search input to reduce re-renders on every keystroke

---

## Performance Optimizations

### Caching
- **In-memory caching** for badge data and all leagues data
- Currently stored in memory using JavaScript `Map`
- Can be migrated to Cache API for offline usage and persistence across tab/browser closures

### Prefetching
- **Badge data prefetching** on league hover for instant modal display
- **Image prefetching** ensures images are served from HTTP cache when modal opens

### Lazy Loading
- Modal component is lazy-loaded using `React.lazy()` to reduce initial bundle size

### Future Optimizations
- **Virtualization** - Can be implemented when dealing with large datasets (e.g., 100+ leagues)

---

## API Endpoints

- **All Leagues:** `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
- **Season Badges:** `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id={league_id}`

---

## Tech Stack

- React 18
- TypeScript
- Vite
- Custom CSS with CSS variables

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
src/
├── components/       # React components
├── services/         # API calls and caching logic
├── hooks/            # Custom React hooks
├── helpers/          # Utility functions
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component
└── App.css           # Application styles
```