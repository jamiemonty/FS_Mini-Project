import BookItem from './BookItem';
import classes from './BookList.module.css';

function BookList(props) {
  return (
    <ul className={classes.list}>
      {(props.books || []).map((book) => (
        <BookItem
          key={book.id}
          id={book.id}
          coverImage={book.coverImage}
          title={book.title}
          author={book.author}
          publishedDate={book.publishedDate}
          description={book.description}
          rsvpCount={book.rsvpCount}
        />
      ))}
    </ul>
  );
}

export default BookList;
