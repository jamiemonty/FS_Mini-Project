import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAdmin } from '../utils/auth';

export default function CreateMap() {
  const [formData, setFormData] = useState({ trailName: '', mapUrl: '', coordinates: '', region: '' });
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin()) {
      alert('Access denied. Admin only.');
      router.push('/login');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/createMap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    if (data.response === 'success') {
      alert('Trail map saved successfully!');
      router.push('/trek-admin');
    } else {
      alert('Failed to save trail map');
    }
  };

  if (!isAdmin()) {
    return null;
  }

  return (
    <div className='container'>
      <h2>Add Trail Map</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Trail Name" value={formData.trailName} onChange={(e) => setFormData({...formData, trailName: e.target.value})} required />
        <input type="text" placeholder="Map URL" value={formData.mapUrl} onChange={(e) => setFormData({...formData, mapUrl: e.target.value})} />
        <input type="text" placeholder="Coordinates" value={formData.coordinates} onChange={(e) => setFormData({...formData, coordinates: e.target.value})} required />
        <input type="text" placeholder="Region" value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})} required />
        <button type="submit" className='btn btn-primary'>Create</button>
      </form>
    </div>
  );
}
