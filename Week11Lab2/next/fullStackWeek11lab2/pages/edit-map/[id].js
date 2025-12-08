import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './editMap.module.css';

export default function EditMap() {
  const [formData, setFormData] = useState({ trailName: '', mapUrl: '', coordinates: '', region: '' });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch('http://localhost:8000/getMap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
        .then(res => res.json())
        .then(data => setFormData(data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/updateMap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, id })
    });
    router.push('/trek-admin');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🗺️ Edit Trail Map</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Trail Name</label>
          <input type="text" value={formData.trailName} onChange={(e) => setFormData({...formData, trailName: e.target.value})} required />
        </div>
        <div className={styles.formGroup}>
          <label>Map URL</label>
          <input type="text" value={formData.mapUrl} onChange={(e) => setFormData({...formData, mapUrl: e.target.value})} />
        </div>
        <div className={styles.formGroup}>
          <label>Coordinates</label>
          <input type="text" value={formData.coordinates} onChange={(e) => setFormData({...formData, coordinates: e.target.value})} required />
        </div>
        <div className={styles.formGroup}>
          <label>Region</label>
          <input type="text" value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})} required />
        </div>
        <button type="submit" className={styles.btnSubmit}>Update Map</button>
      </form>
    </div>
  );
}
