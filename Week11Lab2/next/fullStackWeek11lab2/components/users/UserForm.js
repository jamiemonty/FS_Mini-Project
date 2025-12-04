import { useState } from 'react';

export default function UserForm({ onSubmit, initialData = {}, title = 'Add User' }) {
  const [name, setName] = useState(initialData.name || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [password, setPassword] = useState(initialData.password || '');
  const [accountId, setAccountId] = useState(initialData.accountId || '');
  const [location, setLocation] = useState(initialData.location || '');
  const [errors, setErrors] = useState({});

  function validateForm() {
    let valid = true;
    const errorsCopy = {};

    if (!name.trim()) {
      errorsCopy.name = 'First name is Required';
      valid = false;
    }
    if (!email.trim()) {
      errorsCopy.email = 'Your Email is Required';
      valid = false;
    }
    if (!password.trim()) {
      errorsCopy.password = 'Password is Required';
      valid = false;
    }
    if (!accountId.trim()) {
      errorsCopy.accountId = 'Account Id is Required';
      valid = false;
    }
    if (!location.trim()) {
      errorsCopy.location = 'Location is Required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ name, email, password, accountId, location });
    }
  }

  return (
    <div className='container'>
      <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          <div className='header'>
            <div className='icon'>👤</div>
            <h2 className='title'>{title}</h2>
            <p className='subtitle'>Enter user information below</p>
          </div>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Name:</label>
                <input
                  type='text'
                  placeholder='Enter User Name'
                  value={name}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Email:</label>
                <input
                  type='text'
                  placeholder='Enter User Email'
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Password:</label>
                <input
                  type='password'
                  placeholder='Enter User Password'
                  value={password}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Account Id:</label>
                <input
                  type='text'
                  placeholder='Enter User Account Id'
                  value={accountId}
                  className={`form-control ${errors.accountId ? 'is-invalid' : ''}`}
                  onChange={(e) => setAccountId(e.target.value)}
                />
                {errors.accountId && <div className='invalid-feedback'>{errors.accountId}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Location:</label>
                <input
                  type='text'
                  placeholder='Enter User Location'
                  value={location}
                  className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {errors.location && <div className='invalid-feedback'>{errors.location}</div>}
              </div>

              <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
