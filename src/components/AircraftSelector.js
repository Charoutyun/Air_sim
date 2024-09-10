// src/components/AircraftSelector.js
import React, { useState } from 'react';

const AircraftSelector = ({ aircrafts, onSelect, label }) => {
  const [selectedAircraft, setSelectedAircraft] = useState(null);

  const handleSelection = (aircraftId) => {
    setSelectedAircraft(aircraftId);
    onSelect(aircraftId);
  };

  return (
    <div className="aircraft-selector">
      <label>{label}</label>
      <div className="aircraft-grid">
        {aircrafts.map((aircraft) => (
          <div
            key={aircraft.id}
            className={`aircraft-card ${selectedAircraft === aircraft.id ? 'selected' : ''}`}
            onClick={() => handleSelection(aircraft.id)}
          >
            <img src={aircraft.image} alt={aircraft.name} className="aircraft-image" />
            <span className="aircraft-name">{aircraft.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AircraftSelector;
