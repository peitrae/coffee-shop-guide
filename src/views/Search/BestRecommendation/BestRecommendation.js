import React from "react";

import Card from "../../../components/UI/Card/Card";
import classes from "./BestRecommendation.module.css";

const BestRecommendation = props => {
  return (
    <div onClick={() => props.redirect(props.id)}>
      <div className={classes.GreenLine}></div>
      <Card cardType={classes.BestRecommendation}>
        <h1>Best for you</h1>
        <img src={props.image} alt={props.name} />
        <div className={classes.Description}>
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
              <tr>
                <td className={classes.LeftCol}>More Info:</td>
                <td className={classes.RightCol}>
                  <ul className={classes.MoreInformation}>
                    <li className={classes.MoreInformationList}>Wi-Fi</li>
                    <li className={classes.MoreInformationList}>Ruang Terbuka</li>
                    <li className={classes.MoreInformationList}>Di dalam ruangan</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default BestRecommendation;