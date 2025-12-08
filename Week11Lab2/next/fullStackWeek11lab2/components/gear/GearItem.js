import Card from '../ui/Card';
import classes from './GearItem.module.css';

function GearItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
        </div>
      </Card>
    </li>
  );
}

export default GearItem;
