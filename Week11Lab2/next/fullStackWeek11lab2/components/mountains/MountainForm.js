import { useState } from 'react';
import styles from './MountainForm.module.css';

export default function MountainForm({ onSubmit, initialData = {}, title = 'Add Mountain' }) {
  const [mountainName, setMountainName] = useState(initialData.mountainName || '');
  const [tripLength, setTripLength] = useState(initialData.tripLength || '');
  const [location, setLocation] = useState(initialData.location || '');
  const [mountainLocation, setMountainLocation] = useState(initialData.mountainLocation || '');
  const [image, setImage] = useState(initialData.image || '');
  const [rating, setRating] = useState(initialData.rating || 0);
  const [description, setDescription] = useState(initialData.description || '');
  const [difficulty, setDifficulty] = useState(initialData.difficulty || '');
  const [elevation, setElevation] = useState(initialData.elevation || '');
  const [bestSeason, setBestSeason] = useState(initialData.bestSeason || '');
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  function validateForm() {
    let valid = true;
    const errorsCopy = {};

    if (!mountainName.trim()) {
      errorsCopy.mountainName = 'Mountain Name is Required';
      valid = false;
    }
    if (!tripLength.trim()) {
      errorsCopy.tripLength = 'Trip Length is Required';
      valid = false;
    }
    if (!location.trim()) {
      errorsCopy.location = 'Location is Required';
      valid = false;
    }
    if (!mountainLocation.trim()) {
      errorsCopy.mountainLocation = 'Mountain Location is Required';
      valid = false;
    }
    if (!image.trim()) {
      errorsCopy.image = 'Image is Required';
      valid = false;
    }
    if (!description.trim()) {
      errorsCopy.description = 'Description is Required';
      valid = false;
    }
    if (!difficulty.trim()) {
      errorsCopy.difficulty = 'Difficulty is Required';
      valid = false;
    }
    if (!elevation.trim()) {
      errorsCopy.elevation = 'Elevation is Required';
      valid = false;
    }
    if (!bestSeason.trim()) {
      errorsCopy.bestSeason = 'Best Season is Required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit({ mountainName, tripLength, location, mountainLocation, image, rating, description, difficulty, elevation, bestSeason });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <div className={styles.icon}>🏔️</div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>Fill in the mountain details below</p>
        </div>
        <form>
          <div className={styles.formGroup}>
            <label className={styles.label}>Mountain Name:</label>
            <input
              type='text'
              placeholder='Enter mountain name'
              value={mountainName}
              className={`${styles.input} ${errors.mountainName ? styles.invalid : ''}`}
              onChange={(e) => setMountainName(e.target.value)}
            />
            {errors.mountainName && <div className={styles.error}>{errors.mountainName}</div>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Trip Length:</label>
            <input
              type='text'
              placeholder='Enter Trip Length'
              value={tripLength}
              className={`${styles.input} ${errors.tripLength ? styles.invalid : ''}`}
              onChange={(e) => setTripLength(e.target.value)}
            />
            {errors.tripLength && <div className={styles.error}>{errors.tripLength}</div>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Location:</label>
            <input
              type='text'
              placeholder='Enter Location'
              value={location}
              className={`${styles.input} ${errors.location ? styles.invalid : ''}`}
              onChange={(e) => setLocation(e.target.value)}
            />
            {errors.location && <div className={styles.error}>{errors.location}</div>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Mountain Location:</label>
            <input
              type='text'
              placeholder='Enter Mountain Location'
              value={mountainLocation}
              className={`${styles.input} ${errors.mountainLocation ? styles.invalid : ''}`}
              onChange={(e) => setMountainLocation(e.target.value)}
            />
            {errors.mountainLocation && <div className={styles.error}>{errors.mountainLocation}</div>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Image:</label>
            <input
              type='text'
              placeholder='Enter Image URL'
              value={image}
              className={`${styles.input} ${errors.image ? styles.invalid : ''}`}
              onChange={(e) => setImage(e.target.value)}
            />
            {errors.image && <div className={styles.error}>{errors.image}</div>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description:</label>
            <textarea
              placeholder='Enter mountain description'
              value={description}
              className={`${styles.input} ${errors.description ? styles.invalid : ''}`}
              onChange={(e) => setDescription(e.target.value)}
              rows='4'
            />
            {errors.description && <div className={styles.error}>{errors.description}</div>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Difficulty:</label>
            <select
              value={difficulty}
              className={`${styles.input} ${errors.difficulty ? styles.invalid : ''}`}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value=''>Select Difficulty</option>
              <option value='Easy'>Easy</option>
              <option value='Moderate'>Moderate</option>
              <option value='Hard'>Hard</option>
              <option value='Expert'>Expert</option>
            </select>
            {errors.difficulty && <div className={styles.error}>{errors.difficulty}</div>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Elevation:</label>
            <input
              type='text'
              placeholder='e.g., 8,848m or 29,029ft'
              value={elevation}
              className={`${styles.input} ${errors.elevation ? styles.invalid : ''}`}
              onChange={(e) => setElevation(e.target.value)}
            />
            {errors.elevation && <div className={styles.error}>{errors.elevation}</div>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Best Season:</label>
            <input
              type='text'
              placeholder='e.g., Spring, Summer, Fall'
              value={bestSeason}
              className={`${styles.input} ${errors.bestSeason ? styles.invalid : ''}`}
              onChange={(e) => setBestSeason(e.target.value)}
            />
            {errors.bestSeason && <div className={styles.error}>{errors.bestSeason}</div>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Rating:</label>
            <div className={styles.ratingContainer}>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${styles.star} ${star <= rating ? styles.filled : ''}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className={styles.ratingText}>{rating}/5</span>
            </div>
          </div>

          <button className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
          {showSuccess && <div className={styles.successMessage}>✓ Mountain saved successfully!</div>}
        </form>
      </div>
    </div>
  );
}
