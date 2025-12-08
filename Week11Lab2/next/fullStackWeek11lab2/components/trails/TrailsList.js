import TrailsItem from './TrailsItem';
import classes from './TrailsList.module.css';

function TrailsList(props) {
  return (
    <ul className={classes.list}>
      {props.trails.map((trail) => (
        <TrailsItem key={trail._id} {...trail} />
      ))}
    </ul>
  );
}

export default TrailsList;
