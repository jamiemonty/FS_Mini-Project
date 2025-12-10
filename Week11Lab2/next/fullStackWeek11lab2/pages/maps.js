import { useEffect, useState } from 'react';
import classes from '../styles/Feature.module.css';
import { useRouter } from 'next/router';
import { checkAuth } from '../utils/auth';

export default function MapsPage() {
  const [maps, setMaps] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!checkAuth()) {
      setShowLoginPopup(true);
      return;
    }
    fetch('/api/maps/get-maps')
      .then(res => res.json())
      .then(data => setMaps(data));
  }, []);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>🗺️ Trail Maps</h1>
      <p className={classes.subtitle}>Detailed routes and coordinates for your journey</p>
      <div className={classes.grid}>
        {maps.map((map, index) => {
          //Create a google map search URL based on coordinates
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
      
      {showLoginPopup && (
        <div className={classes.loginPopup}>
          <div className={classes.loginPopupContent}>
            <div className={classes.loginIcon}>🗺️</div>
            <h2 className={classes.loginTitle}>Login Required</h2>
            <p className={classes.loginMessage}>You need to log in to access Trail Maps</p>
            <div className={classes.loginActions}>
              <button 
                className={classes.loginBtn}
                onClick={() => router.push('/login')}
              >
                Go to Login
              </button>
              <button 
                className={classes.cancelBtn}
                onClick={() => router.push('/')}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
