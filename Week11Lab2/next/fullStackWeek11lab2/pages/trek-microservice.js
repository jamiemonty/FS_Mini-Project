import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getMountains, listMountains } from '../services/TrekService';

export default function TrekComponent() {
  const [searchTerm, setMountainId] = useState('');
  const [mountains, setMountains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('cards');
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const router = useRouter();

  useEffect(() => {
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
    <div className='container'>
      <div className='header'>
        <div className='icon'>🏔️</div>
        <h1 className='title'>Mountain Explorer</h1>
        <p className='subtitle'>Discover breathtaking peaks and plan your next adventure</p>
      </div>
      
      <div className='searchSection'>
        <div className='searchBox'>
          <input
            type="text"
            className='searchInput'
            value={searchTerm}
            onChange={handleSearch}
            placeholder="🔍 Search for a mountain destination..."
          />
          <button onClick={searchMountain} className='searchButton'>Search</button>
        </div>
        <div className='statsBar'>
          <div className='statItem'>
            <span className='statIcon'>🏔️</span>
            <span className='statNumber'>{mountains.length}</span>
            <span className='statLabel'>Destinations</span>
          </div>
          <div className='statItem'>
            <span className='statIcon'>🌍</span>
            <span className='statNumber'>50+</span>
            <span className='statLabel'>Countries</span>
          </div>
          <div className='statItem'>
            <span className='statIcon'>⭐</span>
            <span className='statNumber'>4.8</span>
            <span className='statLabel'>Rating</span>
          </div>
        </div>
        <div className='viewToggle'>
          <button 
            className={viewMode === 'cards' ? 'active' : ''}
            onClick={() => setViewMode('cards')}
          >
            🎴 Cards
          </button>
          <button 
            className={viewMode === 'table' ? 'active' : ''}
            onClick={() => setViewMode('table')}
          >
            📊 Table
          </button>
        </div>
      </div>
      {loading ? (
        <div className='loading'>
          <div className='spinner'></div>
          <p>Loading amazing destinations...</p>
        </div>
      ) : mountains.length === 0 ? (
        <div className='noResults'>
          <div className='noResultsIcon'>🔍</div>
          <h3>No Mountains Found</h3>
          <p>Try adjusting your search or explore all destinations</p>
        </div>
      ) : (
      <div className='destinationsSection'>
        <h2 className='sectionTitle'>Available Destinations</h2>
        
        {viewMode === 'cards' ? (
          <div className='cardsGrid'>
            {mountains.map(mountain => (
              <div key={mountain._id} className='mountainCard'>
                <div className='cardImage' style={{backgroundImage: `url(${mountain.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'})`}}>
                  <div className='cardOverlay'>
                    <div className='ratingBadge'>⭐ {mountain.rating || 0}/5</div>
                  </div>
                </div>
                <div className='cardContent'>
                  <h3 className='mountainName'>{mountain.mountainName || 'Unknown Mountain'}</h3>
                  <div className='infoGrid'>
                    <div className='infoItem'>
                      <span className='infoIcon'>⏱️</span>
                      <div>
                        <div className='infoLabel'>Trip Length</div>
                        <div className='infoValue'>{mountain.tripLength || 'N/A'}</div>
                      </div>
                    </div>
                    <div className='infoItem'>
                      <span className='infoIcon'>📍</span>
                      <div>
                        <div className='infoLabel'>Location</div>
                        <div className='infoValue'>{mountain.location || 'N/A'}</div>
                      </div>
                    </div>
                    <div className='infoItem'>
                      <span className='infoIcon'>⛰️</span>
                      <div>
                        <div className='infoLabel'>Mountain Location</div>
                        <div className='infoValue'>{mountain.mountainLocation || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                  <div className='cardActions'>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((mountain.mountainLocation || '') + ' ' + (mountain.location || ''))}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='mapBtn'
                    >
                      🗺️ View on Map
                    </a>
                    <button 
                      className='reviewBtn'
                      onClick={() => setSelectedMountain(mountain)}
                    >
                      ⭐ Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className='tableWrapper'>
        <table className='table table-striped table-bordered'>
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
      
      {selectedMountain && (
        <div className='modal' onClick={() => setSelectedMountain(null)}>
          <div className='modalContent' onClick={(e) => e.stopPropagation()}>
            <button className='closeBtn' onClick={() => setSelectedMountain(null)}>×</button>
            <h2>⭐ Review {selectedMountain.mountainName}</h2>
            <div className='reviewForm'>
              <div className='ratingSection'>
                <label>Rating:</label>
                <div className='stars'>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      className={star <= review.rating ? 'starActive' : 'star'}
                      onClick={() => setReview({...review, rating: star})}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
              <div className='commentSection'>
                <label>Your Review:</label>
                <textarea
                  value={review.comment}
                  onChange={(e) => setReview({...review, comment: e.target.value})}
                  placeholder="Share your experience..."
                  rows="4"
                />
              </div>
              <button 
                className='submitBtn'
                onClick={() => handleReviewSubmit(selectedMountain.id)}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
