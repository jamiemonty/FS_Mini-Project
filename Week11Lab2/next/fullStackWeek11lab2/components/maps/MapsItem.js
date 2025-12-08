import Card from '../ui/Card';
import classes from './MapsItem.module.css';

function MapsItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <p>{props.region}</p>
        </div>
      </Card>
    </li>
  );
}

export default MapsItem;
