// src/components/AircraftSelector.js
import React from 'react';

const AircraftSelector = ({ aircrafts, onSelect, label }) => {
  return (
    <div>
      <label>{label}</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select an Aircraft</option>
        {aircrafts.map((aircraft) => (
          <option key={aircraft.id} value={aircraft.id}>
            {aircraft.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AircraftSelector;
