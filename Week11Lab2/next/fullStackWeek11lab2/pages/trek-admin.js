import { useEffect, useState } from 'react';
import { deleteMountain, listMountains } from '../services/TrekAdminService';
import { useRouter } from 'next/router';
import { isAdmin } from '../utils/auth';

export default function TrekAdminComponent() {
  const [mountains, setMountains] = useState([]);
  const [camping, setCamping] = useState([]);
  const [gear, setGear] = useState([]);
  const [maps, setMaps] = useState([]);
  const [activeTab, setActiveTab] = useState('mountains');
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
    getAllMountains();
    getAllCamping();
    getAllGear();
    getAllMaps();
  }, []);

  function getAllMountains() {
    listMountains().then((response) => {
      setMountains(response.data);
    }).catch(error => {
      console.error(error);
    });
  }

  function getAllCamping() {
    fetch('/api/camping/get-camping')
      .then(res => res.json())
      .then(data => setCamping(data))
      .catch(error => console.error(error));
  }

  function getAllGear() {
    fetch('/api/gear/get-gear')
      .then(res => res.json())
      .then(data => setGear(data))
      .catch(error => console.error(error));
  }

  function getAllMaps() {
    fetch('/api/maps/get-maps')
      .then(res => res.json())
      .then(data => setMaps(data))
      .catch(error => console.error(error));
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
        <div className='icon'>🏞️</div>
        <h2 className='title'>Trek Administration</h2>
        <p className='subtitle'>Manage mountains, camping sites, and gear</p>
      </div>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          className={`btn ${activeTab === 'mountains' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('mountains')}
        >
          🏔️ Mountains
        </button>
        <button 
          className={`btn ${activeTab === 'camping' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('camping')}
        >
          ⛺ Camping Sites
        </button>
        <button 
          className={`btn ${activeTab === 'gear' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('gear')}
        >
          🥾 Gear
        </button>
        <button 
          className={`btn ${activeTab === 'maps' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('maps')}
        >
          🗺️ Trail Maps
        </button>
      </div>

      {activeTab === 'mountains' && (
        <div>
          <button className='btn btn-primary mb-2' onClick={addNewMountain}>Add Mountain</button>
          <div className='tableWrapper'>
            <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Mountain Name</th>
                <th>Trip Length</th>
                <th>Location</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mountains.length === 0 ? (
                <tr><td colSpan="5" style={{textAlign: 'center'}}>No mountains found</td></tr>
              ) : (
                mountains.map(mountain => 
                  <tr key={mountain._id}>
                    <td>{mountain.mountainName}</td>
                    <td>{mountain.tripLength}</td>
                    <td>{mountain.location}</td>
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
      )}

      {activeTab === 'camping' && (
        <div>
          <button className='btn btn-primary mb-2' onClick={() => router.push('/create-camping')}>Add Camping Site</button>
          <div className='tableWrapper'>
            <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Site Name</th>
                <th>Location</th>
                <th>Capacity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {camping.map((site) => 
                <tr key={site._id}>
                  <td>{site.siteName}</td>
                  <td>{site.location}</td>
                  <td>{site.capacity}</td>
                  <td>{site.price}</td>
                  <td>
                    <button className='btn btn-info' onClick={() => router.push(`/edit-camping/${site._id}`)}>Update</button>
                    <button className='btn btn-danger' onClick={async () => {
                      try {
                        await fetch('http://localhost:8000/deleteCampingSite', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ id: site._id })
                        });
                        getAllCamping();
                      } catch (error) {
                        alert('Failed to delete. Make sure backend server is running.');
                      }
                    }}>Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {activeTab === 'gear' && (
        <div>
          <button className='btn btn-primary mb-2' onClick={() => router.push('/create-gear')}>Add Gear</button>
          <div className='tableWrapper'>
            <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Recommended</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gear.map((item) => 
                <tr key={item._id}>
                  <td>{item.itemName}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.recommended ? '⭐ Yes' : 'No'}</td>
                  <td>
                    <button className='btn btn-info' onClick={() => router.push(`/edit-gear/${item._id}`)}>Update</button>
                    <button className='btn btn-danger' onClick={async () => {
                      try {
                        await fetch('http://localhost:8000/deleteGear', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ id: item._id })
                        });
                        getAllGear();
                      } catch (error) {
                        alert('Failed to delete. Make sure backend server is running.');
                      }
                    }}>Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {activeTab === 'maps' && (
        <div>
          <button className='btn btn-primary mb-2' onClick={() => router.push('/create-map')}>Add Trail Map</button>
          <div className='tableWrapper'>
            <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Trail Name</th>
                <th>Region</th>
                <th>Coordinates</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {maps.map((map) => 
                <tr key={map._id}>
                  <td>{map.trailName}</td>
                  <td>{map.region}</td>
                  <td>{map.coordinates}</td>
                  <td>
                    <button className='btn btn-info' onClick={() => router.push(`/edit-map/${map._id}`)}>Update</button>
                    <button className='btn btn-danger' onClick={async () => {
                      try {
                        await fetch('http://localhost:8000/deleteMap', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ id: map._id })
                        });
                        getAllMaps();
                      } catch (error) {
                        alert('Failed to delete. Make sure backend server is running.');
                      }
                    }}>Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}
