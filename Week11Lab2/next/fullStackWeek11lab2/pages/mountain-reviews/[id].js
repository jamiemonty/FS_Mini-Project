import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkAuth, isAdmin } from '../../utils/auth';

export default function MountainReviews() {
  const [reviews, setReviews] = useState([]);
  const [mountain, setMountain] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success');
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const showNotification = (message, type = 'success') => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  useEffect(() => {
    if (!checkAuth()) {
      alert('Please login to view reviews');
      router.push('/login');
      return;
    }
    setIsUserAdmin(isAdmin());
    if (id) {
      fetchMountain();
      fetchReviews();
    }
  }, [id]);

  const fetchMountain = async () => {
    const res = await fetch('http://localhost:8000/getMountain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const data = await res.json();
    setMountain(data);
  };

  const fetchReviews = async () => {
    const res = await fetch('/api/reviews/get-reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mountainId: id })
    });
    const data = await res.json();
    setReviews(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    try {
      const res = await fetch('/api/reviews/create-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mountainId: id,
          mountainName: mountain?.mountainName,
          userName: user.name,
          userEmail: user.email,
          ...newReview
        })
      });
      const data = await res.json();
      showNotification('✅ Review submitted successfully!', 'success');
      setNewReview({ rating: 5, comment: '' });
      fetchReviews();
    } catch (error) {
      showNotification('❌ Failed to submit review', 'error');
    }
  };

  const handleDelete = (reviewId) => {
    if (!isUserAdmin) {
      showNotification('⚠️ Admin access required to delete reviews', 'warning');
      return;
    }
    setDeleteReviewId(reviewId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    setShowConfirm(false);
    try {
      const res = await fetch('/api/reviews/delete-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteReviewId })
      });
      const data = await res.json();
      if (data.response === 'success') {
        showNotification('✅ Review deleted successfully!', 'success');
        fetchReviews();
      } else {
        showNotification('❌ Failed to delete review', 'error');
      }
    } catch (error) {
      showNotification('❌ Failed to delete review', 'error');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      {showPopup && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, padding: '1rem 1.5rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', background: popupType === 'success' ? '#4CAF50' : popupType === 'error' ? '#f44336' : '#ff9800', color: 'white', fontWeight: 'bold', animation: 'slideIn 0.3s ease-out' }}>
          {popupMessage}
        </div>
      )}
      {showConfirm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, animation: 'fadeIn 0.2s ease-out' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', maxWidth: '400px', animation: 'scaleIn 0.2s ease-out' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>⚠️ Confirm Delete</h3>
            <p style={{ margin: '0 0 1.5rem 0', color: '#666' }}>Are you sure you want to delete this review? This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowConfirm(false)} style={{ padding: '0.5rem 1.5rem', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
              <button onClick={confirmDelete} style={{ padding: '0.5rem 1.5rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <h1>Reviews for {mountain?.mountainName}</h1>
      
      <div style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2>Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Rating: </label>
            {[1,2,3,4,5].map(star => (
              <span key={star} onClick={() => setNewReview({...newReview, rating: star})} style={{ cursor: 'pointer', fontSize: '24px', color: star <= newReview.rating ? 'gold' : 'gray' }}>★</span>
            ))}
          </div>
          <textarea value={newReview.comment} onChange={(e) => setNewReview({...newReview, comment: e.target.value})} placeholder="Share your experience..." style={{ width: '100%', padding: '0.5rem', minHeight: '100px' }} required />
          <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit Review</button>
        </form>
      </div>

      <h2>All Reviews ({reviews.length})</h2>
      {reviews.map((review, idx) => (
        <div key={idx} style={{ background: 'white', padding: '1rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ddd', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <strong>{review.userName}</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>{[...Array(5)].map((_, i) => <span key={i} style={{ color: i < review.rating ? 'gold' : 'gray' }}>★</span>)}</span>
              {isUserAdmin && (
                <button onClick={() => handleDelete(review._id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
              )}
            </div>
          </div>
          <p>{review.comment}</p>
          <small style={{ color: '#666' }}>{new Date(review.date).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}
