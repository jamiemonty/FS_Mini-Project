import classes from "./HamMenuFAB.module.css";
import { IoIosMenu } from 'react-icons/io';

export default function HamMenuFAB(props) {
  return (
    <button
      className={classes.mainDiv}
      onClick={props.toggleMenuHide}
      aria-label="Open navigation menu"
      type="button"
    >
      <span className={classes.mainSpan}><IoIosMenu /></span>
    </button>
  );
}