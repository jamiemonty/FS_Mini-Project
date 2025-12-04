import { useEffect, useState } from 'react';
import { getMountain, updateMountain } from '../../services/TrekAdminService';
import { useRouter } from 'next/router';
import MountainForm from '../../components/mountains/MountainForm';

export default function EditMountainComponent() {
  const [initialData, setInitialData] = useState(null);
  const router = useRouter();
  const { Id } = router.query;

  useEffect(() => {
    if (Id) {
      getMountain(Id).then((response) => {
        setInitialData(response.data);
      }).catch(error => {
        console.error(error);
      });
    }
  }, [Id]);

  function handleSubmit(mountain) {
    updateMountain(Id, mountain).then((response) => {
      console.log(response.data);
      router.push('/trek-admin');
    }).catch(error => {
      console.error(error);
    });
  }

  if (!initialData) return <div>Loading...</div>;

  return <MountainForm onSubmit={handleSubmit} initialData={initialData} title="Update Mountain" />;
}
