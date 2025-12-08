import { useEffect, useState } from 'react';
import classes from '../styles/Feature.module.css';
import { useRouter } from 'next/router';
import { checkAuth } from '../utils/auth';

export default function MapsPage() {
  const [maps, setMaps] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!checkAuth()) {
      alert('Please login to access this page');
      router.push('/login');
      return;
    }
    fetch('/api/get-maps')
      .then(res => res.json())
      .then(data => setMaps(data));
  }, []);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>🗺️ Trail Maps</h1>
      <p className={classes.subtitle}>Detailed routes and coordinates for your journey</p>
      <div className={classes.grid}>
        {maps.map((map, index) => {
          const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(map.coordinates)}`;
          return (
            <div 
              key={index} 
              className={classes.card}
              onClick={() => window.open(googleMapsUrl, '_blank')}
              style={{ cursor: 'pointer' }}
            >
              <h3>{map.trailName}</h3>
              <div className={classes.badge}>{map.region}</div>
              <p><strong>📍 Coordinates:</strong> {map.coordinates}</p>
              <p><strong>🗺️ Click to view on Google Maps</strong></p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
