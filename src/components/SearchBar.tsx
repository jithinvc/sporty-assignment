import React from 'react';
import type { SearchBarProps } from '../types';

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onSearchChange, 
  placeholder = "Search leagues..." 
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;