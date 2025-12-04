import { useEffect, useState } from 'react';
import { deleteUser, listUsers } from '../services/UserService';
import { useRouter } from 'next/router';

export default function ListUserComponent() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
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
