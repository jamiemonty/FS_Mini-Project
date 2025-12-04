import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewBookForm.module.css';

function NewBookForm(props) {
  const titleInputRef = useRef();
  const authorInputRef = useRef();
  const coverImageInputRef = useRef();
  const publishedDateInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredAuthor = authorInputRef.current.value;
    const enteredPublishedDate = publishedDateInputRef.current.value; 
    const enteredCoverImage = coverImageInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const bookData = {
      title: enteredTitle,
      author : enteredAuthor,
      publishedDate: enteredPublishedDate,
      coverImage: enteredCoverImage,
      description: enteredDescription,
    };

    props.onAddBook(bookData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Book Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='author'>Author</label>
          <input type='text' required id='author' ref={authorInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='publishedDate'>Published Date</label>
          <input type='date' required id='publishedDate' ref={publishedDateInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Cover Image URL</label>
          <input type='url' required id='coverImage' ref={coverImageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Book</button>
        </div>
      </form>
    </Card>
  );
}

export default NewBookForm;
