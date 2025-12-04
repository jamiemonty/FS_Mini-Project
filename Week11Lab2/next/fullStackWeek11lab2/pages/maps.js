import { useEffect, useState } from 'react';
import classes from '../styles/Feature.module.css';

export default function MapsPage() {
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    fetch('/api/get-maps')
      .then(res => res.json())
      .then(data => setMaps(data));
  }, []);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>🗺️ Trail Maps</h1>
      <p className={classes.subtitle}>Detailed routes and coordinates for your journey</p>
      <div className={classes.grid}>
        {maps.map((map, index) => (
          <div key={index} className={classes.card}>
            <h3>{map.trailName}</h3>
            <div className={classes.badge}>{map.region}</div>
            <p><strong>📍 Coordinates:</strong> {map.coordinates}</p>
            <p><strong>🔗 Map URL:</strong> <a href={map.mapUrl} target="_blank" rel="noopener noreferrer">View Map</a></p>
          </div>
        ))}
      </div>
    </div>
  );
}
