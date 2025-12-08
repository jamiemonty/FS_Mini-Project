import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Register.module.css';

export default function RegisterComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const response = await fetch('http://localhost:8000/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'user'
      })
    });

    const data = await response.json();
    if (data.response === 'success') {
      setShowSuccess(true);
      setTimeout(() => router.push('/login'), 1500);
    } else {
      setError('Registration failed. Email may already exist.');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <div className={styles.icon}>🎒</div>
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.subtitle}>Join the trekking community</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Name:</label>
            <input
              type='text'
              placeholder='Enter your name'
              className={styles.input}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <input
              type='email'
              placeholder='Enter your email'
              className={styles.input}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password:</label>
            <input
              type='password'
              placeholder='Enter password'
              className={styles.input}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm Password:</label>
            <input
              type='password'
              placeholder='Confirm password'
              className={styles.input}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type='submit' className={styles.submitBtn}>Register</button>
          {showSuccess && <div className={styles.successMessage}>✓ Account created successfully!</div>}
          <div style={{textAlign: 'center', marginTop: '20px'}}>
            <Link href='/login' style={{color: '#5dade2', textDecoration: 'none', fontWeight: '600'}}>
              Already have an account? Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
