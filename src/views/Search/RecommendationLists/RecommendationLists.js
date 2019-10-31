import React from "react";

import Card from "../../../components/UI/Card/Card";
import classes from "./RecommendationLists.module.css";

const recommendationLists = props => (
  <div onClick={() => props.redirect(props.id)}>
    <Card cardType={classes.List}>
      <img src={props.image} alt={props.name} className={classes.ImgList}/>
      <div className={classes.ListDescription}>
        <h2>{props.name}</h2>
        <span className={classes.Address}>{props.address}</span>
        <table className={classes.Details}>
          <tbody>
            <tr>
              <td className={classes.LeftCol}>Hours:</td>
              <td className={classes.RightCol}>
                {props.operationalHours}
              </td>
            </tr>
            <tr>
              <td className={classes.LeftCol}>Average Price:</td>
              <td className={classes.RightCol}>{props.averagePrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
    </div>
  );

export default recommendationLists;