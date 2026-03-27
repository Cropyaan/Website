import React, { useState } from 'react';
import apiService from '../services/api';
import { Search, X, Loader, Navigation } from 'lucide-react';

const SearchBar = ({ onSearchResult }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLocationClick = () => {
    if ('geolocation' in navigator) {
      setLoading(true);
      setError('');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSearchResult({ lat: position.coords.latitude, lng: position.coords.longitude });
          setLoading(false);
        },
        () => {
          setError('Location access denied. Please enable location services.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await apiService.searchLocation(query.trim());
      onSearchResult(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Location not found in India. Try a village, city, or pincode.');
      } else {
        setError('Search failed. The server might be waking up, please try again in a moment.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agrimap-search-container">
      <form className="agrimap-search-bar" onSubmit={handleSearch}>
        <div className="agrimap-search-input-wrapper">
          <Search size={20} className="agrimap-search-icon" />
          <input
            type="text"
            placeholder="Search by village, city, or pincode..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
          {query && (
            <button type="button" className="agrimap-clear-btn" onClick={() => { setQuery(''); setError(''); }}>
              <X size={18} />
            </button>
          )}
          <button type="button" className="agrimap-clear-btn" onClick={handleLocationClick} title="Use My Location">
            <Navigation size={18} />
          </button>
        </div>
        <button type="submit" className="agrimap-search-submit" disabled={loading || !query.trim()}>
          {loading ? <Loader size={18} className="agrimap-rotate" /> : 'Search'}
        </button>
      </form>
      {error && <div className="agrimap-search-error">{error}</div>}
    </div>
  );
};

export default SearchBar;
