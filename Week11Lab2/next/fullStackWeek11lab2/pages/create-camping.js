import { useRouter } from 'next/router';
import { isAdmin } from '../utils/auth';
import { useEffect, useState } from 'react';
import styles from '../components/mountains/MountainForm.module.css';

export default function CreateCampingComponent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    siteName: '',
    location: '',
    capacity: '',
    amenities: '',
    price: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isAdmin()) {
      alert('Access denied. Admin only.');
      router.push('/login');
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/createCampingSite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    if (data.response === 'success') {
      setShowSuccess(true);
      setTimeout(() => router.push('/trek-admin'), 1500);
    }
  }

  if (!isAdmin()) return null;

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <div className={styles.icon}>🏕️</div>
          <h2 className={styles.title}>Add Camping Site</h2>
          <p className={styles.subtitle}>Fill in the camping site details below</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Site Name:</label>
            <input type='text' placeholder='Enter site name' className={styles.input} value={formData.siteName} onChange={(e) => setFormData({...formData, siteName: e.target.value})} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Location:</label>
            <input type='text' placeholder='Enter location' className={styles.input} value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Capacity:</label>
            <input type='text' placeholder='Enter capacity' className={styles.input} value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: e.target.value})} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Amenities:</label>
            <input type='text' placeholder='Enter amenities' className={styles.input} value={formData.amenities} onChange={(e) => setFormData({...formData, amenities: e.target.value})} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Price:</label>
            <input type='text' placeholder='Enter price' className={styles.input} value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
          </div>
          <button type='submit' className={styles.submitBtn}>Submit</button>
          {showSuccess && <div className={styles.successMessage}>✓ Camping site saved successfully!</div>}
        </form>
      </div>
    </div>
  );
}
