import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg">
      <div className="relative flex-grow">
        <input
          type="text"
          className="w-full px-4 py-2 pl-10 pr-12 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          placeholder="搜索节点..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="absolute left-3 top-2.5 text-gray-400">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
      <button
        type="submit"
        className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-r-lg transition duration-300 ease-in-out"
      >
        搜索
      </button>
    </form>
  );
};

export default SearchBar; 