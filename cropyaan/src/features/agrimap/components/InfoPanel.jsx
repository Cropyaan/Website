import React from 'react';
import { MapPin, Cloud, Droplets, Thermometer, Sprout, TrendingUp, Layers } from 'lucide-react';

const InfoPanel = ({ data, loading, isWaking, error, selectedLocation }) => {
  if (loading) {
    return (
      <div className="agrimap-info-sidebar">
        <div className="agrimap-loader-container">
          <div className="agrimap-spinner"></div>
          <p>{isWaking ? 'Waking up server...' : 'Analyzing location...'}</p>
          {isWaking && (
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '8px', textAlign: 'center' }}>
              Render's free tier sleeps after 15m. <br /> This can take up to 45 seconds.
            </p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="agrimap-info-sidebar">
        <div className="agrimap-empty-state agrimap-error-state">
          <Layers size={48} color="#ef4444" />
          <h3 style={{ color: '#ef4444' }}>Insight Failure</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '16px', padding: '8px 16px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="agrimap-info-sidebar">
        <div className="agrimap-empty-state">
          <MapPin size={48} />
          <h3>Welcome to AgriMap India</h3>
          <p>Click anywhere on the map to get soil insights, weather forecasts, and AI-powered crop recommendations.</p>
        </div>
      </div>
    );
  }

  const { soil, weather, recommended_crops, profitable_crops } = data;

  return (
    <div className="agrimap-info-sidebar">
      <div style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '1rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={24} color="#2e7d32" />
          Location Insights
        </h2>
        {selectedLocation && (
          <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#666' }}>
            {selectedLocation.lat.toFixed(4)}° N, {selectedLocation.lng.toFixed(4)}° E
          </p>
        )}
      </div>

      <div className="agrimap-info-card agrimap-soil">
        <div className="agrimap-card-header">
          <Layers />
          <span>Soil Analysis</span>
        </div>
        <div className="agrimap-soil-value">{soil}</div>
      </div>

      <div className="agrimap-info-card agrimap-weather">
        <div className="agrimap-card-header">
          <Cloud />
          <span>Current Weather</span>
        </div>
        <div className="agrimap-weather-grid">
          <div className="agrimap-weather-item">
            <Thermometer size={16} color="#666" />
            <span className="agrimap-weather-label">Temp</span>
            <span className="agrimap-weather-value">{weather.temperature}°C</span>
          </div>
          <div className="agrimap-weather-item">
            <Droplets size={16} color="#666" />
            <span className="agrimap-weather-label">Humidity</span>
            <span className="agrimap-weather-value">{weather.humidity}%</span>
          </div>
          <div className="agrimap-weather-item">
            <Cloud size={16} color="#666" />
            <span className="agrimap-weather-label">Rainfall</span>
            <span className="agrimap-weather-value">{weather.rainfall}mm</span>
          </div>
        </div>
      </div>

      <div className="agrimap-info-card agrimap-crops">
        <div className="agrimap-card-header">
          <Sprout />
          <span>Recommended Crops</span>
        </div>
        <div className="agrimap-pill-container">
          {recommended_crops.map((crop) => (
            <span key={crop} className="agrimap-pill">{crop}</span>
          ))}
        </div>
      </div>

      <div className="agrimap-info-card agrimap-crops" style={{ borderTopColor: '#f57f17' }}>
        <div className="agrimap-card-header" style={{ color: '#f57f17' }}>
          <TrendingUp />
          <span>Most Profitable</span>
        </div>
        <div className="agrimap-pill-container">
          {profitable_crops.map((crop) => (
            <span key={crop} className="agrimap-pill agrimap-pill-profitable">{crop}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
