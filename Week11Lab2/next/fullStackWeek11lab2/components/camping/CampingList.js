import CampingItem from './CampingItem';
import classes from './CampingList.module.css';

function CampingList(props) {
  return (
    <ul className={classes.list}>
      {props.camping.map((camp) => (
        <CampingItem key={camp._id} {...camp} />
      ))}
    </ul>
  );
}

export default CampingList;
