import React from "react";

import classes from "./Card.module.css";

const Card = props => {
  let style = [classes.Card, [props.className]].join(" ");
  if (props.shadow)
    style = [classes.Card, [props.className], classes.Shadow].join(" ");

  return <div className={style}>{props.children}</div>;
};

export default Card;
