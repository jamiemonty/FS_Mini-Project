import { createMountain } from '../services/TrekAdminService';
import { useRouter } from 'next/router';
import MountainForm from '../components/mountains/MountainForm';

export default function CreateMountainComponent() {
  const router = useRouter();

  async function handleSubmit(mountain) {
    try {
      console.log('Submitting mountain:', mountain);
      const response = await createMountain(mountain);
      console.log('Response:', response.data);
      if (response.data.response === 'success') {
        alert('Mountain saved successfully!');
        router.push('/trek-admin');
      } else {
        alert('Failed to save mountain: ' + (response.data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving mountain: ' + error.message);
    }
  }

  return <MountainForm onSubmit={handleSubmit} title="Add Mountain" />;
}
