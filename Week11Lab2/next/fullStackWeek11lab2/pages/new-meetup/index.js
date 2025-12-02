// our-domain.com/new-book
import NewBookForm from '../../components/books/NewBookForm';
import { useRouter } from 'next/router';
import GlobalContext from "../../pages/store/globalContext";
import { useContext } from 'react';

function NewBookPage() {
  const router = useRouter();
  const globalCtx = useContext(GlobalContext);

  async function addBookHandler(enteredBookData) {
    await globalCtx.updateGlobals({ cmd: 'addBook', newVal: enteredBookData });
    router.push('/');
  }

  return <NewBookForm onAddBook={addBookHandler} />;
}

export default NewBookPage;