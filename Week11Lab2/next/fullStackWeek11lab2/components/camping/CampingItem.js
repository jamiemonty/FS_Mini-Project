import Card from '../ui/Card';
import classes from './CampingItem.module.css';

function CampingItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <p>{props.location}</p>
        </div>
      </Card>
    </li>
  );
}

export default CampingItem;
