import Card from '../ui/Card';
import classes from './TrailsItem.module.css';

function TrailsItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <p>{props.difficulty}</p>
        </div>
      </Card>
    </li>
  );
}

export default TrailsItem;
