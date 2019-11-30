import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

import Card from "../../../components//UI/Card/Card";
import classes from "./Information.module.css";
import { BtnSmall } from "../../../components/UI/Button/Button";
import OperationalHours from "./OperationalHours/OperationalHours";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textFieldHalf: {
    width: 300
  }
}));

const Information = props => {
  const classesMaterial = useStyles();

  const { state, setState } = props
  const {
    averagePrice,
    contact,
    facilities
  } = state;

  const inputChangeHandler = type => event => {
    setState({ ...state, [type]: event.target.value });
  };

  const facilitiesChangeHandler = index => event => {
    const tempEdit = [...state.facilities];
    tempEdit[index] = event.target.value;
    setState({ ...state, facilities: tempEdit });
  };

  const addFacilitiesHandler = event => {
    event.preventDefault();
    const tempAdd = [...state.facilities];
    tempAdd.push("");
    setState({ ...state, facilities: tempAdd });
  };

  const deleteHandler = (type, index) => {
    const tempDelete = [...state[type]];
    tempDelete.splice(index, 1);
    setState({ ...state, [type]: tempDelete });
  };

  return (
    <Card cardType={classes.Card}>
      <h2>Information</h2>
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Average Price</th>
                <td className={classes.TablePaddingHelper}>
                  <TextField
                    id="averagePrice"
                    className={classesMaterial.textFieldHalf}
                    placeholder="Average Price"
                    value={averagePrice}
                    onChange={inputChangeHandler("averagePrice")}
                    margin="normal"
                    type="number"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rp</InputAdornment>
                      )
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>Contact</th>
                <td className={classes.TablePaddingHelper}>
                  <TextField
                    id="contact"
                    placeholder="Contact"
                    className={classesMaterial.textFieldHalf}
                    value={contact}
                    onChange={inputChangeHandler("contact")}
                    margin="normal"
                    type="number"
                    variant="outlined"
                  />
                </td>
              </tr>
              <tr>
                <th>Amenities</th>
                <td>
                  <table>
                    <tbody>
                      {facilities.map((facility, index) => (
                        <tr key={index}>
                          <td>
                            <TextField
                              id="facilities"
                              placeholder="Facilities"
                              className={classesMaterial.textFieldHalf}
                              value={facility}
                              onChange={facilitiesChangeHandler(index)}
                              margin="normal"
                              variant="outlined"
                            />
                          </td>
                          <td className={classes.ButtonPaddingHelper}>
                            <BtnSmall
                              btnName="Delete"
                              btnType="Danger"
                              clicked={() =>
                                deleteHandler("facilities", index)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>
                          <BtnSmall
                            btnName="Add More"
                            clicked={addFacilitiesHandler}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <OperationalHours state={state} setState={setState} deleteHandler={deleteHandler}/>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default Information;
