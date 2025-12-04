import { useEffect, useState } from 'react';
import { deleteMountain, listMountains } from '../services/TrekAdminService';
import { useRouter } from 'next/router';

export default function TrekAdminComponent() {
  const [mountains, setMountains] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllMountains();
  }, []);

  function getAllMountains() {
    listMountains().then((response) => {
      setMountains(response.data);
    }).catch(error => {
      console.error(error);
    });
  }

  function addNewMountain() {
    router.push('/create-mountain');
  }

  function updateMountain(Id) {
    router.push(`/edit-mountain/${Id}`);
  }

  function removeMountain(Id) {
    console.log(Id);
    deleteMountain(Id).then((response) => {
      getAllMountains();
    }).catch(error => {
      console.error(error);
    });
  }

  return (
    <div className='container'>
      <div className='header'>
        <div className='icon'>🏞️</div>
        <h2 className='title'>Mountain Administration</h2>
        <p className='subtitle'>Manage mountain destinations and trekking companies</p>
      </div>
      <button className='btn btn-primary mb-2' onClick={addNewMountain}>Add Mountain</button>
      <div className='tableWrapper'>
        <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Mountain Name</th>
            <th>Trip Length</th>
            <th>Location</th>
            <th>Mountain Location</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mountains.length === 0 ? (
            <tr><td colSpan="6" style={{textAlign: 'center'}}>No mountains found</td></tr>
          ) : (
            mountains.map(mountain => 
              <tr key={mountain._id}>
                <td>{mountain.mountainName}</td>
                <td>{mountain.tripLength}</td>
                <td>{mountain.location}</td>
                <td>{mountain.mountainLocation}</td>
                <td>{mountain.rating}/5</td>
                <td>
                  <button className='btn btn-info' onClick={() => updateMountain(mountain._id)}>Update</button>
                  <button className='btn btn-danger' onClick={() => removeMountain(mountain._id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}
