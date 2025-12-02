import classes from "./Button.module.css";

export default function Button(props) {
  const styleObj = { maxWidth: props.maxWidth, minWidth: props.maxWidth };

  if (props.hide) {
    return null;
  }

  return (
    <button
      className={classes.mainDiv}
      style={styleObj}
      type={props.type || "button"}
      onClick={props.onClickHandler}
      disabled={props.disabled}
    >
      <span className={classes.textDiv}>
        <span className={classes.mainText}>{props.text1}</span>
        {props.text2 && <span className={classes.mainText}>{props.text2}</span>}
      </span>
      {props.icon && (
        <span className={classes.iconDiv}>
          {props.icon}
        </span>
      )}
    </button>
  );
}
