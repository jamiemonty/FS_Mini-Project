import { useEffect, useState } from 'react';
import classes from '../styles/Feature.module.css';

export default function GearPage() {
  const [gear, setGear] = useState([]);

  useEffect(() => {
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
          <div key={index} className={`${classes.card} ${item.recommended ? classes.recommended : ''}`}>
            <h3>{item.itemName}</h3>
            <div className={classes.badge}>{item.category}</div>
            {item.recommended && <div className={classes.recommendedBadge}>⭐ Recommended</div>}
            <p className={classes.description}>{item.description}</p>
            <p className={classes.price}><strong>💰 Price:</strong> {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
