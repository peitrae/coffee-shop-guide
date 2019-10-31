import React from "react";

import Card from "../UI/Card/Card";
import classes from "./RecommendationLists.module.css";

const recommendationLists = props => (
    <Card cardType={classes.List}>
      <img src={props.image} alt="Image List" className={classes.ImgList}/>
      <div className={classes.ListDescription}>
        <h2>{props.name}</h2>
        <span className={classes.Address}>{props.address}</span>
        <table className={classes.Details}>
          <tbody>
            <tr>
              <td className={classes.LeftCol}>Jam Buka:</td>
              <td className={classes.RightCol}>
                {props.openingHour} - {props.closingHour}
              </td>
            </tr>
            <tr>
              <td className={classes.LeftCol}>Harga rata - rata:</td>
              <td className={classes.RightCol}>{props.averagePrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );

export default recommendationLists;
