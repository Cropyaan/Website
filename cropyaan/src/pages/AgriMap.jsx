import React, { useState, useRef } from 'react';
import AgriMapComponent from '../features/agrimap/components/AgriMap';
import InfoPanel from '../features/agrimap/components/InfoPanel';
import SearchBar from '../features/agrimap/components/SearchBar';
import apiService from '../features/agrimap/services/api';
import '../cssPages/AgriMap.css';

export default function AgriMapPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isWaking, setIsWaking] = useState(false);
  const [error, setError] = useState(null);

  const wakingTimer = useRef(null);

  const handleLocationSelect = async (lat, lng) => {
    setSelectedLocation({ lat, lng });
    setLoading(true);
    setIsWaking(false);
    setError(null);
    setLocationData(null);

    wakingTimer.current = setTimeout(() => setIsWaking(true), 3500);

    try {
      const response = await apiService.getInsights(lat, lng);
      setLocationData(response.data);
    } catch (err) {
      const detail =
        err.response?.data?.detail ||
        'Failed to fetch agricultural insights. Please retry.';
      setError(detail);
    } finally {
      clearTimeout(wakingTimer.current);
      setLoading(false);
      setIsWaking(false);
    }
  };

  const handleSearchResult = ({ lat, lng }) => {
    handleLocationSelect(lat, lng);
  };

  return (
    <div className="agrimap-page">
      <header className="agrimap-header">
        <h1>🌱 AgriMap Insights</h1>
        <div className="agrimap-header-search">
          <SearchBar onSearchResult={handleSearchResult} />
        </div>
      </header>

      <main className="agrimap-main">
        <InfoPanel
          data={locationData}
          loading={loading}
          isWaking={isWaking}
          error={error}
          selectedLocation={selectedLocation}
        />
        <AgriMapComponent
          selectedLocation={selectedLocation}
          onLocationSelect={handleLocationSelect}
        />
      </main>
    </div>
  );
}
