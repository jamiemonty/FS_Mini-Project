import { useEffect, useState } from 'react';
import classes from '../styles/Feature.module.css';
import { useRouter } from 'next/router';
import { checkAuth } from '../utils/auth';

export default function CampingPage() {
  const [sites, setSites] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!checkAuth()) {
      setShowLoginPopup(true);
      return;
    }
    fetch('/api/camping/get-camping')
      .then(res => res.json())
      .then(data => setSites(data));
  }, []);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>⛺ Camping Sites</h1>
      <p className={classes.subtitle}>Find perfect spots to rest during your trek</p>
      <div className={classes.grid}>
        {sites.map((site, index) => (
          <div key={index} className={classes.card}>
            <h3>{site.siteName}</h3>
            <div className={classes.badge} style={{background: '#4CAF50'}}>{site.price}</div>
            <p><strong>📍 Location:</strong> {site.location}</p>
            <p><strong>👥 Capacity:</strong> {site.capacity}</p>
            <p><strong>🏕️ Amenities:</strong> {site.amenities}</p>
          </div>
        ))}
      </div>
      
      {showLoginPopup && (
        <div className={classes.loginPopup}>
          <div className={classes.loginPopupContent}>
            <div className={classes.loginIcon}>⛺</div>
            <h2 className={classes.loginTitle}>Login Required</h2>
            <p className={classes.loginMessage}>You need to log in to access Camping Sites</p>
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
