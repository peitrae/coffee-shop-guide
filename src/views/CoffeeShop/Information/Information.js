import React from 'react';
import { useSelector } from 'react-redux';

import Card from '../../../components/UI/Card/Card';
import classes from './Information.module.css';

const Information = () => {
  const coffeeShopData = useSelector((state) => state.coffeeShop.data);

  const day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const {
    operationalHours,
    averagePrice,
    contact,
    facilities,
  } = coffeeShopData;

  if (!operationalHours && !averagePrice && !contact && !facilities) {
    return null;
  }

  return (
    <Card className={classes.Information}>
      <h2 className={classes.HeaderText}>Information</h2>
      <div className={classes.Desc}>
        <div>
          <table>
            <tbody>
              {operationalHours && (
                <tr>
                  <th className={classes.TableHeader}>Opening hours:</th>
                  <td>{day[operationalHours[0].day]}</td>
                  <td>
                    {operationalHours[0].open} - {operationalHours[0].close}
                  </td>
                </tr>
              )}
              {operationalHours?.slice(1).map((value) => (
                <tr key={value.day}>
                  <th></th>
                  <td>{day[value.day]}</td>
                  <td>{`${value.open} - ${value.close}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <tbody>
              {averagePrice && (
                <tr>
                  <th className={classes.TableHeader}>Average Price:</th>
                  <td colSpan="2">{`Rp ${averagePrice} (1 menu)`}</td>
                </tr>
              )}
              {contact && (
                <tr>
                  <th className={classes.TableHeader}>Contact:</th>
                  <td colSpan="2">{contact}</td>
                </tr>
              )}

              {facilities && (
                <tr>
                  <th className={classes.TableHeader}>Facilities:</th>
                  <td>{facilities[0]}</td>
                </tr>
              )}
              {facilities?.slice(1).map((facility, index) => (
                <tr key={index}>
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
