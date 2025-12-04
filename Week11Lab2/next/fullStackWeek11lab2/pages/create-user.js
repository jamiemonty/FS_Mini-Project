import { createUser } from '../services/UserService';
import { useRouter } from 'next/router';
import UserForm from '../components/users/UserForm';

export default function CreateUserComponent() {
  const router = useRouter();

  function handleSubmit(user) {
    createUser(user).then((response) => {
      console.log(response.data);
      router.push('/list-users');
    }).catch(error => {
      console.error(error);
    });
  }

  return <UserForm onSubmit={handleSubmit} title="Add User" />;
}
