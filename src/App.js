// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AircraftSelector from './components/AircraftSelector';
import BattleSimulator from './components/BattleSimulator';
import './App.css';

function App() {
  const [aircrafts, setAircrafts] = useState([]);
  const [selectedAircraft1, setSelectedAircraft1] = useState('');
  const [selectedAircraft2, setSelectedAircraft2] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAircraftList = async () => {
      try {
        const response = await fetch(
          'https://api.worldofwarplanes.com/wowp/encyclopedia/planes/?application_id=644b142aa035b6d09302c1e804627363'
        );
        const data = await response.json();

        if (data.status === 'ok') {
          const planes = Object.values(data.data).map((plane) => ({
            id: plane.plane_id,
            name: plane.name,
            nation: plane.nation_i18n || plane.nation || 'Unknown',
            level: plane.level || 'Unknown',
            type: plane.type || 'Unknown',
            image: plane.images?.medium || '', // Include medium size image URL
          }));
          setAircrafts(planes);
        } else {
          setError('Failed to fetch aircraft list: ' + (data.error?.message || 'Unknown error'));
        }
      } catch (error) {
        setError('Error fetching aircraft list: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAircraftList();
  }, []);

  if (loading) return <div>Loading aircraft data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <Header />
      <div className="selector-container">
        <AircraftSelector
          aircrafts={aircrafts}
          onSelect={setSelectedAircraft1}
          label="Select Aircraft 1"
        />
        <AircraftSelector
          aircrafts={aircrafts}
          onSelect={setSelectedAircraft2}
          label="Select Aircraft 2"
        />
      </div>
      <BattleSimulator
        aircraft1={selectedAircraft1}
        aircraft2={selectedAircraft2}
        aircrafts={aircrafts}
      />
    </div>
  );
}

export default App;
