import { useEffect, useState } from 'react';
import classes from '../styles/Feature.module.css';
import { useRouter } from 'next/router';
import { checkAuth } from '../utils/auth';

export default function GearPage() {
  const [gear, setGear] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!checkAuth()) {
      alert('Please login to access this page');
      router.push('/login');
      return;
    }
    fetch('/api/get-gear')
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
            <p className={classes.price}><strong>💰 Price:</strong> {item.price}</p>
            {item.shopUrl && <p className={classes.shopLink}>🛒 Click to shop</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
