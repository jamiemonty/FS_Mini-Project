import { useEffect, useState } from 'react';
import classes from '../styles/Feature.module.css';
import { useRouter } from 'next/router';
import { checkAuth } from '../utils/auth';

export default function TrailsPage() {
  const [trails, setTrails] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!checkAuth()) {
      setShowLoginPopup(true);
      return;
    }
    fetch('/api/trails/get-trails')
      .then(res => res.json())
      .then(data => setTrails(data));
  }, []);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>🏔️ Mountain Trails</h1>
      <p className={classes.subtitle}>Explore stunning peaks and valleys around the world</p>
      <div className={classes.grid}>
        {trails.map((trail, index) => (
          <div key={index} className={classes.card}>
            <h3>{trail.name}</h3>
            <div className={classes.badge}>{trail.difficulty}</div>
            <p><strong>📍 Location:</strong> {trail.location}</p>
            <p><strong>📏 Distance:</strong> {trail.distance}</p>
            <p><strong>⛰️ Elevation:</strong> {trail.elevation}</p>
            <p className={classes.description}>{trail.description}</p>
          </div>
        ))}
      </div>
      
      {showLoginPopup && (
        <div className={classes.loginPopup}>
          <div className={classes.loginPopupContent}>
            <div className={classes.loginIcon}>🔒</div>
            <h2 className={classes.loginTitle}>Login Required</h2>
            <p className={classes.loginMessage}>You need to log in to access Mountain Trails</p>
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
