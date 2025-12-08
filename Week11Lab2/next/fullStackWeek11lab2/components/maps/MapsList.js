import MapsItem from './MapsItem';
import classes from './MapsList.module.css';

function MapsList(props) {
  return (
    <ul className={classes.list}>
      {props.maps.map((map) => (
        <MapsItem key={map._id} {...map} />
      ))}
    </ul>
  );
}

export default MapsList;
