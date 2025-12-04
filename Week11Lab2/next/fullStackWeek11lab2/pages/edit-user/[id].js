import { useEffect, useState } from 'react';
import { getUser, updateUser } from '../../services/UserService';
import { useRouter } from 'next/router';
import UserForm from '../../components/users/UserForm';

export default function EditUserComponent() {
  const [initialData, setInitialData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getUser(id).then((response) => {
        setInitialData(response.data);
      }).catch(error => {
        console.error(error);
      });
    }
  }, [id]);

  function handleSubmit(user) {
    updateUser(id, user).then((response) => {
      console.log(response.data);
      router.push('/list-users');
    }).catch(error => {
      console.error(error);
    });
  }

  if (!initialData) return <div>Loading...</div>;

  return <UserForm onSubmit={handleSubmit} initialData={initialData} title="Update User" />;
}
