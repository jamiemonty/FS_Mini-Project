import { useRouter } from 'next/router';
import { isAdmin } from '../../utils/auth';
import { useEffect, useState } from 'react';
import styles from '../../components/mountains/MountainForm.module.css';

export default function EditGearComponent() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    description: '',
    price: '',
    shopUrl: '',
    recommended: false
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isAdmin()) {
      alert('Access denied. Admin only.');
      router.push('/login');
      return;
    }
    if (id) {
      fetch('http://localhost:8000/getGearItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
        .then(res => res.json())
        .then(data => setFormData(data));
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/updateGear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...formData })
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
          <div className={styles.icon}>🎒</div>
          <h2 className={styles.title}>Edit Gear Item</h2>
          <p className={styles.subtitle}>Update the gear item details below</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Item Name:</label>
            <input type='text' placeholder='Enter item name' className={styles.input} value={formData.itemName} onChange={(e) => setFormData({...formData, itemName: e.target.value})} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Category:</label>
            <input type='text' placeholder='Enter category' className={styles.input} value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Description:</label>
            <textarea placeholder='Enter description' className={styles.input} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows='4' required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Price:</label>
            <input type='text' placeholder='Enter price' className={styles.input} value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Shop URL:</label>
            <input type='text' placeholder='Enter shop URL' className={styles.input} value={formData.shopUrl} onChange={(e) => setFormData({...formData, shopUrl: e.target.value})} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
              <input type='checkbox' checked={formData.recommended} onChange={(e) => setFormData({...formData, recommended: e.target.checked})} style={{width: 'auto', cursor: 'pointer'}} />
              Recommended
            </label>
          </div>
          <button type='submit' className={styles.submitBtn}>Update</button>
          {showSuccess && <div className={styles.successMessage}>✓ Gear item updated successfully!</div>}
        </form>
      </div>
    </div>
  );
}
