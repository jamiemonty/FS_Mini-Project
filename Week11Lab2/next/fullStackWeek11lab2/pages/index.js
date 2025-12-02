import BookList from '../components/books/BookList';
import { useContext } from "react";
import GlobalContext from "./store/globalContext";

function HomePage() {
    const globalCtx = useContext(GlobalContext);

    if (globalCtx.theGlobalObject.dataLoaded === true) {
        return <BookList books={globalCtx.theGlobalObject.books} />;
    }
    return <div>Loading data from database, please wait . . . </div>;
}
export default HomePage;