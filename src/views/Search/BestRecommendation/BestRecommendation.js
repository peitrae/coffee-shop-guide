import React from "react";
import { NavLink } from "react-router-dom";

import Card from "../../../components/UI/Card/Card";
import classes from "./BestRecommendation.module.css";

const BestRecommendation = props => {
  return (
    <NavLink to={`/coffee-shop/${props.coffeeShopId}`}>
      <div className={classes.GreenLine}></div>
      <Card className={classes.BestRecommendation}>
        <h1>Best for you</h1>
        <img src={props.image} alt={props.name} />
        <div className={classes.Description}>
          <h2>{props.name}</h2>
          <span className={classes.Address}>{props.address}</span>
          <table className={classes.Details}>
            <tbody>
              <tr>
                <td className={classes.LeftCol}>Hours:</td>
                <td className={classes.RightCol}>{props.operationalHours}</td>
              </tr>
              <tr>
                <td className={classes.LeftCol}>Average Price:</td>
                <td className={classes.RightCol}>{props.averagePrice}</td>
              </tr>
              <tr>
                <td className={classes.LeftCol}>Facilities:</td>
                <td className={classes.RightCol}>
                  <ul className={classes.MoreInformation}>
                    {props.facilities.map((facility, index) => (
                      <li key={index} className={classes.MoreInformationList}>
                        {facility}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </NavLink>
  );
};

export default BestRecommendation;
