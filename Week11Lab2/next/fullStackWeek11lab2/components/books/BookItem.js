import Card from '../ui/Card';
import classes from './BookItem.module.css';
import { useRouter } from 'next/router';

function BookItem(props) {
  const router = useRouter();
  const [rsvpCount, setRsvpCount] = useState(props.rsvpCount || 0);

  function showDetailsHandler() {
    router.push('/' + props.id);
  }

   function handleRsvp() {
    setRsvpCount(rsvpCount + 1);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.coverImage} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.author}</address>
          <p><strong> Published Date:</strong> {props.publishedDate}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
          <button onClick={handleRsvp}>RSVP ({rsvpCount})</button>
          <span>RSVPs: {rsvpCount}</span>
        </div>
      </Card>
    </li>
  );
}

export default BookItem;
