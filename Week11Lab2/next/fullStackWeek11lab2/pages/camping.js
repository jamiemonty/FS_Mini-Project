import { useEffect, useState } from 'react';
import classes from '../styles/Feature.module.css';
import { useRouter } from 'next/router';
import { checkAuth } from '../utils/auth';

export default function CampingPage() {
  const [sites, setSites] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!checkAuth()) {
      alert('Please login to access this page');
      router.push('/login');
      return;
    }
    fetch('/api/get-camping')
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
            <div className={classes.badge}>{site.price}</div>
            <p><strong>📍 Location:</strong> {site.location}</p>
            <p><strong>👥 Capacity:</strong> {site.capacity}</p>
            <p><strong>🏕️ Amenities:</strong> {site.amenities}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
