import React from 'react';

import TextForm from '../../../../components/UI/TextForm/TextForm';
import { BtnSmall } from '../../../../components/UI/Button/Button';
import classes from './Facilities.module.css';

const Facilities = (props) => {
  const {
    facilities = [""],
    facilityChangeHandler,
    addFacilityHandler,
    deleteHandler,
  } = props;

  return (
    <table>
      <tbody>
        {facilities.map((facility, index) => (
          <tr key={index}>
            <td>
              <TextForm
                id="facilities"
                label="Facilities"
                placeholder="Facilities"
                className={'textField-3'}
                value={facility}
                inputHandler={facilityChangeHandler(index)}
              />
            </td>
            <td className={classes.ButtonPaddingHelper}>
              <BtnSmall
                btnType="Danger"
                clicked={() => deleteHandler('facilities', index)}
              >
                Delete
              </BtnSmall>
            </td>
          </tr>
        ))}
        <tr>
          <td>
            <BtnSmall clicked={addFacilityHandler}>Add More</BtnSmall>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Facilities;
