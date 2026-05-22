import React from 'react';
import type { SportFilterProps } from '../types';

const SportFilter: React.FC<SportFilterProps> = ({ 
  sports, 
  selectedSport, 
  onSportChange 
}) => {
  return (
    <div className="sport-filter">
      <label htmlFor="sport-select" className="filter-label">
        Filter by Sport:
      </label>
      <select
        id="sport-select"
        value={selectedSport}
        onChange={(e) => onSportChange(e.target.value)}
        className="sport-select"
      >
        <option value="all">All Sports</option>
        {sports.map((sport) => (
          <option key={sport} value={sport}>
            {sport}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SportFilter;