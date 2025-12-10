import { useEffect, useState } from 'react';
import classes from '../styles/Feature.module.css';
import { useRouter } from 'next/router';
import { checkAuth } from '../utils/auth';

export default function GearPage() {
  const [gear, setGear] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!checkAuth()) {
      setShowLoginPopup(true);
      return;
    }
    fetch('/api/gear/get-gear')
      .then(res => res.json())
      .then(data => setGear(data));
  }, []);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>🥾 Gear Guide</h1>
      <p className={classes.subtitle}>Essential equipment recommendations for your adventure</p>
      <div className={classes.grid}>
        {gear.map((item, index) => (
          <div 
            key={index} 
            className={`${classes.card} ${item.recommended ? classes.recommended : ''}`}
            onClick={() => item.shopUrl && window.open(item.shopUrl, '_blank')}
            style={{ cursor: item.shopUrl ? 'pointer' : 'default' }}
          >
            <h3>{item.itemName}</h3>
            <div className={classes.badge}>{item.category}</div>
            {item.recommended && <div className={classes.recommendedBadge}>⭐ Recommended</div>}
            <p className={classes.description}>{item.description}</p>
            <p className={classes.price} style={{color: '#4CAF50'}}><strong>💰 Price:</strong> {item.price}</p>
            {item.shopUrl && <p className={classes.shopLink}>🛒 Click to shop</p>}
          </div>
        ))}
      </div>
      
      {showLoginPopup && (
        <div className={classes.loginPopup}>
          <div className={classes.loginPopupContent}>
            <div className={classes.loginIcon}>🎒</div>
            <h2 className={classes.loginTitle}>Login Required</h2>
            <p className={classes.loginMessage}>You need to log in to access Gear Guide</p>
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
