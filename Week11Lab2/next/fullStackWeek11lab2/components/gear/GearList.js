import GearItem from './GearItem';
import classes from './GearList.module.css';

function GearList(props) {
  return (
    <ul className={classes.list}>
      {props.gear.map((item) => (
        <GearItem key={item._id} {...item} />
      ))}
    </ul>
  );
}

export default GearList;
