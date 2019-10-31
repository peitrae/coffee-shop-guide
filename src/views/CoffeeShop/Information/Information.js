import React from "react";
import { useSelector } from "react-redux";

import Card from "../../../components/UI/Card/Card";
import classes from "./Information.module.css";

const Information = props => {
  const coffeeShopData = useSelector(state => state.coffeeShop.data);

  const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <Card cardType={classes.Information}>
      <h2 className={classes.HeaderText}>Information</h2>
      <div className={classes.Desc}>
        <div>
          <table>
            <tbody>
              <tr>
                <th className={classes.TableHeader}>Opening hours:</th>
                <td>{day[coffeeShopData.operationalHours[0].day]}</td>
                <td>
                  {coffeeShopData.operationalHours[0].open} -{" "}
                  {coffeeShopData.operationalHours[0].close}
                </td>
              </tr>
              {coffeeShopData.operationalHours.slice(1).map(value => (
                <tr key={value.day}>
                  <th></th>
                  <td>{day[value.day]}</td>
                  <td>
                    {`${value.open} - ${value.close}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <th className={classes.TableHeader}>Average Price:</th>
                <td colSpan="2">{`Rp ${coffeeShopData.averagePrice} (1 menu)`}</td>
              </tr>
              <tr>
                <th className={classes.TableHeader}>Contact:</th>
                <td colSpan="2">{coffeeShopData.contact}</td>
              </tr>
              <tr>
                <th className={classes.TableHeader}>Facilities:</th>
                <td>{coffeeShopData.facilities[0]}</td>
              </tr>
              {coffeeShopData.facilities.slice(1).map(facility => (
                <tr>
                  <th></th>
                  <td>{facility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div></div>
      </div>
    </Card>
  );
};

export default React.memo(Information);
