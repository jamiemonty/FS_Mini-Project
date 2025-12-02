import classes from "./HamMenu.module.css";
import { IoIosMenu } from 'react-icons/io';

export default function HamMenu(props) {
  return (
    <button
      className={classes.mainDiv}
      onClick={props.onToggleMenu}
      aria-label="Open navigation menu"
      type="button"
    >
      <span className={classes.mainSpan}><IoIosMenu /></span>
    </button>
  );
}