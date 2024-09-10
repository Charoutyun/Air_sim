// src/components/BattleSimulator.js
import React, { useState, useEffect } from 'react';

const BattleSimulator = ({ aircraft1, aircraft2, aircrafts }) => {
  const [fighter1Details, setFighter1Details] = useState(null);
  const [fighter2Details, setFighter2Details] = useState(null);
  const [result, setResult] = useState('');
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchPlaneDetails = async (planeId, setDetails) => {
      try {
        const response = await fetch(
          `https://api.worldofwarplanes.com/wowp/encyclopedia/planeinfo/?application_id=644b142aa035b6d09302c1e804627363&plane_id=${planeId}`
        );
        const data = await response.json();

        if (data.status === 'ok') {
          setDetails(data.data[planeId]); // Store details of the plane
        } else {
          console.error('Failed to fetch plane details:', data.error);
        }
      } catch (error) {
        console.error('Error fetching plane details:', error);
      }
    };

    if (aircraft1) {
      fetchPlaneDetails(aircraft1, setFighter1Details);
    }
    if (aircraft2) {
      fetchPlaneDetails(aircraft2, setFighter2Details);
    }
  }, [aircraft1, aircraft2]);

  const calculateBattleOutcome = () => {
    if (!fighter1Details || !fighter2Details) {
      setResult('Loading aircraft details...');
      return;
    }

    // Calculate scores based on key stats
    const score1 =
      fighter1Details.features.dps * 0.4 +
      fighter1Details.features.maneuverability * 0.2 +
      fighter1Details.features.max_speed * 0.1 +
      fighter1Details.features.rate_of_climbing * 0.1 +
      fighter1Details.features.hp * 0.2 +
      Math.random() * 10; // Adding some randomness

    const score2 =
      fighter2Details.features.dps * 0.4 +
      fighter2Details.features.maneuverability * 0.2 +
      fighter2Details.features.max_speed * 0.1 +
      fighter2Details.features.rate_of_climbing * 0.1 +
      fighter2Details.features.hp * 0.2 +
      Math.random() * 10; // Adding some randomness

    // Determine the winner and set a summary
    if (score1 > score2) {
      setResult(`${fighter1Details.name} wins!`);
      setSummary({
        winner: fighter1Details.name,
        loser: fighter2Details.name,
        stats: [
          { factor: 'Firepower', winner: fighter1Details.features.dps, loser: fighter2Details.features.dps },
          { factor: 'Maneuverability', winner: fighter1Details.features.maneuverability, loser: fighter2Details.features.maneuverability },
          { factor: 'Max Speed', winner: fighter1Details.features.max_speed, loser: fighter2Details.features.max_speed },
          { factor: 'Rate of Climb', winner: fighter1Details.features.rate_of_climbing, loser: fighter2Details.features.rate_of_climbing },
        ],
      });
    } else {
      setResult(`${fighter2Details.name} wins!`);
      setSummary({
        winner: fighter2Details.name,
        loser: fighter1Details.name,
        stats: [
          { factor: 'Firepower', winner: fighter2Details.features.dps, loser: fighter1Details.features.dps },
          { factor: 'Maneuverability', winner: fighter2Details.features.maneuverability, loser: fighter1Details.features.maneuverability },
          { factor: 'Max Speed', winner: fighter2Details.features.max_speed, loser: fighter1Details.features.max_speed },
          { factor: 'Rate of Climb', winner: fighter2Details.features.rate_of_climbing, loser: fighter1Details.features.rate_of_climbing },
        ],
      });
    }
  };

  return (
    <div>
      <button className="btn-76" onClick={calculateBattleOutcome}>
        Start Battle
        <span className="top"></span>
        <span className="right"></span>
        <span className="bottom"></span>
        <span className="left"></span>
      </button>
      {result && <h2>{result}</h2>}
      {summary && (
        <div>
          <h3>Summary of Stats:</h3>
          <p>{summary.winner} vs. {summary.loser}</p>
          <table>
            <thead>
              <tr>
                <th>Factor</th>
                <th>{summary.winner}</th>
                <th>{summary.loser}</th>
              </tr>
            </thead>
            <tbody>
              {summary.stats.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.factor}</td>
                  <td>{stat.winner}</td>
                  <td>{stat.loser}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BattleSimulator;
