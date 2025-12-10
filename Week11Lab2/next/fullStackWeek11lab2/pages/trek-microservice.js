import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getMountains, listMountains } from '../services/TrekService';
import styles from './trek-microservice.module.css';
import { checkAuth } from '../utils/auth';

export default function TrekComponent() {
  const [searchTerm, setMountainId] = useState('');
  const [mountains, setMountains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('cards');
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [detailView, setDetailView] = useState(null);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!checkAuth()) {
      setShowLoginPopup(true);
      return;
    }
    getAllMountains();
  }, []);

  function getAllMountains() {
    setLoading(true);
    listMountains().then((response) => {
      setMountains(response.data);
      setLoading(false);
    }).catch(error => {
      console.error(error);
      setLoading(false);
    });
  }

  const handleSearch = (e) => {
    setMountainId(e.target.value);
  };

  function searchMountain(e) {
    e.preventDefault();
    if (searchTerm) {
      setLoading(true);
      getMountains(searchTerm).then((response) => {
        setMountains(response.data);
        setLoading(false);
      }).catch(error => {
        console.error(error);
        setLoading(false);
      });
    }
  }

  function handleReviewSubmit(mountainId) {
    console.log('Review submitted for mountain:', mountainId, review);
    alert(`Review submitted! Rating: ${review.rating}/5\nComment: ${review.comment}`);
    setSelectedMountain(null);
    setReview({ rating: 5, comment: '' });
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon} style={{filter: 'grayscale(100%) brightness(1.2)'}}>🏔️</div>
        <h1 className={styles.title}>Mountain Explorer</h1>
        <p className={styles.subtitle}>Discover breathtaking peaks and plan your next adventure</p>
      </div>
      
      <div className={styles.searchSection}>
        <div className={styles.searchBox}>
          <input
            type="text"
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearch}
            placeholder="🔍 Search for a mountain destination..."
          />
          <button onClick={searchMountain} className={styles.searchButton}>Search</button>
        </div>
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>🏔️</span>
            <span className={styles.statNumber}>{mountains.length}</span>
            <span className={styles.statLabel}>Destinations</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>🌍</span>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Countries</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>⭐</span>
            <span className={styles.statNumber}>4.8</span>
            <span className={styles.statLabel}>Rating</span>
          </div>
        </div>
        <div className={styles.viewToggle}>
          <button 
            className={viewMode === 'cards' ? styles.active : ''}
            onClick={() => setViewMode('cards')}
          >
            🎴 Cards
          </button>
          <button 
            className={viewMode === 'table' ? styles.active : ''}
            onClick={() => setViewMode('table')}
          >
            📊 Table
          </button>
        </div>
      </div>
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading amazing destinations...</p>
        </div>
      ) : mountains.length === 0 ? (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>🔍</div>
          <h3>No Mountains Found</h3>
          <p>Try adjusting your search or explore all destinations</p>
        </div>
      ) : (
      <div className={styles.destinationsSection}>
        <h2 className={styles.sectionTitle}>Available Destinations</h2>
        
        {viewMode === 'cards' ? (
          <div className={styles.cardsGrid}>
            {mountains.map(mountain => (
              <div key={mountain._id} className={styles.mountainCard} onClick={() => setDetailView(mountain)}>
                <div className={styles.cardImage} style={{backgroundImage: `url(${mountain.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'})`}}>
                  <div className={styles.cardOverlay}>
                    <div className={styles.ratingBadge}>⭐ {mountain.rating || 0}/5</div>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.mountainName}>{mountain.mountainName || 'Unknown Mountain'}</h3>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>⏱️</span>
                      <div>
                        <div className={styles.infoLabel}>Trip Length</div>
                        <div className={styles.infoValue}>{mountain.tripLength || 'N/A'}</div>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>📍</span>
                      <div>
                        <div className={styles.infoLabel}>Location</div>
                        <div className={styles.infoValue}>{mountain.location || 'N/A'}</div>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>⛰️</span>
                      <div>
                        <div className={styles.infoLabel}>Mountain Location</div>
                        <div className={styles.infoValue}>{mountain.mountainLocation || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.cardActions}>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((mountain.mountainLocation || '') + ' ' + (mountain.location || ''))}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={styles.mapBtn}
                      onClick={(e) => e.stopPropagation()}
                    >
                      🗺️ View on Map
                    </a>
                    <button 
                      className={styles.reviewBtn}
                      onClick={(e) => { e.stopPropagation(); router.push(`/mountain-reviews/${mountain._id}`); }}
                    >
                      💬 Reviews
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className={styles.tableWrapper}>
        <table className={styles.table}>
        <thead>
          <tr>
            <th>Mountain Name</th>
            <th>Trip Length</th>
            <th>Location</th>
            <th>Mountain Location</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {mountains.map(mountain => 
            <tr key={mountain._id}>
              <td>{mountain.mountainName}</td>
              <td>{mountain.tripLength}</td>
              <td>{mountain.location}</td>
              <td>{mountain.mountainLocation}</td>
              <td>⭐ {mountain.rating}/5</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
        )}
      </div>
      )}
      
      {detailView && (
        <div className={styles.detailModal} onClick={() => setDetailView(null)}>
          <div className={styles.detailModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setDetailView(null)}>×</button>
            <div className={styles.detailImage} style={{backgroundImage: `url(${detailView.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200'})`}}>
              <div className={styles.detailOverlay}>
                <h1 className={styles.detailTitle}>{detailView.mountainName}</h1>
                <div className={styles.detailRating}>⭐ {detailView.rating || 0}/5</div>
              </div>
            </div>
            <div className={styles.detailBody}>
              {detailView.description && (
                <div className={styles.detailSection}>
                  <h3>📖 About This Mountain</h3>
                  <p className={styles.detailDescription}>{detailView.description}</p>
                </div>
              )}
              <div className={styles.detailSection}>
                <h3>📋 Trip Information</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>⏱️</span>
                    <div>
                      <div className={styles.detailLabel}>Trip Length</div>
                      <div className={styles.detailValue}>{detailView.tripLength || 'N/A'}</div>
                    </div>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>📍</span>
                    <div>
                      <div className={styles.detailLabel}>Location</div>
                      <div className={styles.detailValue}>{detailView.location || 'N/A'}</div>
                    </div>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>⛰️</span>
                    <div>
                      <div className={styles.detailLabel}>Mountain Location</div>
                      <div className={styles.detailValue}>{detailView.mountainLocation || 'N/A'}</div>
                    </div>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>🎯</span>
                    <div>
                      <div className={styles.detailLabel}>Difficulty</div>
                      <div className={styles.detailValue}>{detailView.difficulty || 'N/A'}</div>
                    </div>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>📏</span>
                    <div>
                      <div className={styles.detailLabel}>Elevation</div>
                      <div className={styles.detailValue}>{detailView.elevation || 'N/A'}</div>
                    </div>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>🌤️</span>
                    <div>
                      <div className={styles.detailLabel}>Best Season</div>
                      <div className={styles.detailValue}>{detailView.bestSeason || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.detailActions}>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((detailView.mountainLocation || '') + ' ' + (detailView.location || ''))}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.detailMapBtn}
                >
                  🗺️ View on Map
                </a>
                <button 
                  className={styles.detailReviewBtn}
                  onClick={() => router.push(`/mountain-reviews/${detailView._id}`)}
                >
                  💬 View Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedMountain && (
        <div className={styles.modal} onClick={() => setSelectedMountain(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedMountain(null)}>×</button>
            <h2>⭐ Review {selectedMountain.mountainName}</h2>
            <div className={styles.reviewForm}>
              <div className={styles.ratingSection}>
                <label>Rating:</label>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      className={star <= review.rating ? styles.starActive : styles.star}
                      onClick={() => setReview({...review, rating: star})}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.commentSection}>
                <label>Your Review:</label>
                <textarea
                  value={review.comment}
                  onChange={(e) => setReview({...review, comment: e.target.value})}
                  placeholder="Share your experience..."
                  rows="4"
                />
              </div>
              <button 
                className={styles.submitBtn}
                onClick={() => handleReviewSubmit(selectedMountain.id)}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoginPopup && (
        <div className={styles.loginPopup}>
          <div className={styles.loginPopupContent}>
            <div className={styles.loginIcon}>🔐</div>
            <h2 className={styles.loginTitle}>Login Required</h2>
            <p className={styles.loginMessage}>You need to log in to access the Mountain Explorer</p>
            <div className={styles.loginActions}>
              <button 
                className={styles.loginBtn}
                onClick={() => router.push('/login')}
              >
                Go to Login
              </button>
              <button 
                className={styles.cancelBtn}
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
