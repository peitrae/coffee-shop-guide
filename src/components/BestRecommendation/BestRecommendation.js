import React from "react";

import Card from "../UI/Card/Card";
import classes from "./BestRecommendation.module.css";

const BestRecommendation = props => {
  return (
    <React.Fragment>
      <div className={classes.GreenLine}></div>
      <Card cardType={classes.BestRecommendation}>
        <h1>Terbaik Untukmu</h1>
        <img src={props.image} alt="Image Recommendation" />
        <div className={classes.Description}>
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
              <tr>
                <td className={classes.LeftCol}>Info lebih lanjut:</td>
                <td className={classes.RightCol}>
                  <ul>{/* <li>{...}</li> */}</ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default BestRecommendation;
