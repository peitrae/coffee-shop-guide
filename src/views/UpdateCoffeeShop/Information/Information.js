import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';

import TextForm from '../../../components/UI/TextForm/TextForm';
import Card from '../../../components//UI/Card/Card';
import classes from './Information.module.css';
import Facilities from './Facilities/Facilities';
import OperationalHours from './OperationalHours/OperationalHours';

const Information = (props) => {
  const { state, setState } = props;
  const { averagePrice, contact, facilities } = state;

  const inputChangeHandler = (type) => (event) => {
    setState({ ...state, [type]: event.target.value });
  };

  const facilityChangeHandler = (index) => (event) => {
    const tempEdit = [...state.facilities];
    tempEdit[index] = event.target.value;
    setState({ ...state, facilities: tempEdit });
  };

  const addFacilityHandler = (event) => {
    event.preventDefault();
    const tempAdd = [...state.facilities];
    tempAdd.push('');
    setState({ ...state, facilities: tempAdd });
  };

  const deleteHandler = (type, index) => {
    const tempDelete = [...state[type]];
    tempDelete.splice(index, 1);
    setState({ ...state, [type]: tempDelete });
  };

  return (
    <Card className={classes.Card}>
      <h2>Information</h2>
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Average Price</th>
                <td className={classes.TablePaddingHelper}>
                  <TextForm
                    id="averagePrice"
                    label={'averagePrice'}
                    className={'textField-3'}
                    placeholder="Average Price"
                    value={averagePrice}
                    inputHandler={inputChangeHandler('averagePrice')}
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rp</InputAdornment>
                      ),
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>Contact</th>
                <td className={classes.TablePaddingHelper}>
                  <TextForm
                    id="contact"
                    label="Contact"
                    className={'textField-3'}
                    placeholder="Contact"
                    value={contact}
                    inputHandler={inputChangeHandler('contact')}
                    type="number"
                  />
                </td>
              </tr>
              <tr>
                <th>Amenities</th>
                <td>
                  <Facilities
                    facilities={facilities}
                    facilityChangeHandler={facilityChangeHandler}
                    addFacilityHandler={addFacilityHandler}
                  />
                </td>
              </tr>
              <OperationalHours
                state={state}
                setState={setState}
                deleteHandler={deleteHandler}
              />
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default Information;
