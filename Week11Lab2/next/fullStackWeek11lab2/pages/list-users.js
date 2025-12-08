import { useEffect, useState } from 'react';
import { deleteUser, listUsers } from '../services/UserService';
import { useRouter } from 'next/router';
import { isAdmin } from '../utils/auth';

export default function ListUserComponent() {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin()) {
      setShowPopup(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      return;
    }
    getAllUsers();
  }, []);

  function getAllUsers() {
    listUsers().then((response) => {
      setUsers(response.data);
    }).catch(error => {
      console.error(error);
    });
  }

  function addNewUser() {
    router.push('/create-user');
  }

  function updateUser(id) {
    router.push(`/edit-user/${id}`);
  }

  function removeUser(id) {
    console.log(id);
    deleteUser(id).then((response) => {
      getAllUsers();
    }).catch(error => {
      console.error(error);
    });
  }

  if (!isAdmin()) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        {showPopup && (
          <div style={{ padding: '2rem 3rem', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', background: '#dc3545', color: 'white', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', animation: 'fadeIn 0.3s ease-out' }}>
            🚫 Access Denied<br/><span style={{ fontSize: '14px', fontWeight: 'normal' }}>This page is only accessible to administrators</span>
          </div>
        )}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='header'>
        <div className='icon'>👥</div>
        <h2 className='title'>User Management</h2>
        <p className='subtitle'>Manage all user accounts and permissions</p>
      </div>
      <button className='btn btn-primary mb-2' onClick={addNewUser}>Create User</button>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
            <th>User Email Id</th>
            <th>User Password</th>
            <th>User Account Id</th>
            <th>User Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => 
            <tr key={user.id}>
              <td>{user.id}</td>  
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.accountId}</td>
              <td>{user.location}</td>
              <td>
                <button className='btn btn-info' onClick={() => updateUser(user.id)}>Update</button>
                <button className='btn btn-danger' onClick={() => removeUser(user.id)} style={{marginLeft: '10px'}}>Delete</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
