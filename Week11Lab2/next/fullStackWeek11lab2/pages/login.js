import { useState } from 'react';
import { useRouter } from 'next/router';

export default function UserLoginComponent() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const adminName = 'admin';
  const adminPassword = '111';
  const testName = 'test';
  const testPassword = '222';
  const trekAdminName = 'trek';
  const trekAdminPassword = '333';

  const verifyUserDetails = async (e) => {
    e.preventDefault();
    setError('');

    if (adminName === name && adminPassword === password) {
      router.push('/list-users');
      return;
    }

    if (testName === name && testPassword === password) {
      router.push('/trek-microservice');
      return;
    }

    if (trekAdminName === name && trekAdminPassword === password) {
      router.push('/trek-admin');
      return;
    }

    setError('Invalid name or password');
  };

  return (
    <div className="container">
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          <div className='header'>
            <div className='icon'>🔐</div>
            <h2 className='title'>Welcome Back</h2>
            <p className='subtitle'>Sign in to access your trekking dashboard</p>
          </div>
          <div className='card-body'>
            <form onSubmit={verifyUserDetails}>
              <div className='form-group mb-2'>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  placeholder='Enter User Name'
                  name='name'
                  id="name"
                  className='form-control'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Password:</label>
                <input
                  type="password"
                  placeholder='Enter User Password'
                  name='password'
                  id="password"
                  className='form-control'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div>
                <button className='btn btn-primary mb-2' style={{marginLeft: '10px'}} type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
