import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";

import { BtnMedium, BtnSmall } from "../../../components/UI/Button/Button";
import ProfileCard from "../../../components/UI/Card/ProfileCard/ProfileCard";
import ProfileImg from "../../../assets/logo/defaultProfile.png";
import classes from "./Profile.module.css";
import * as actions from "../../../store/actions/member";

const Profile = (props) => {
  const dispatch = useDispatch();

  const { showEditProfile, showEditPassword, showVerificationHandler } = props;

  const { name, email, emailVerified, photoUrl } = useSelector(
    ({ member }) => member
  );

  const toBeOwner = () => dispatch(actions.sendVerification());

  const toBeOwnerHandler = () => {
    toBeOwner();
    showVerificationHandler();
  };

  const addCoffeeShop = () => props.history.push("/update-coffee-shop");

  const image = (
    <img
      src={photoUrl || ProfileImg}
      alt="Profile"
      className={classes.ImgProfile}
    />
  );

  return (
    <ProfileCard image={image}>
      <div className={classes.Profile}>
        <div className={classes.DivEdit}>
          <BtnSmall className={classes.BtnSmall} clicked={showEditProfile}>
            Edit Profile
          </BtnSmall>
          <BtnSmall className={classes.BtnSmall} clicked={showEditPassword}>
            Edit Password
          </BtnSmall>
          <BtnSmall className={classes.BtnSmall} clicked={showEditPassword}>
            Edit Preference
          </BtnSmall>
        </div>
        <div className={classes.DivProfile}>
          <span className={classes.Name}>{name}</span>
          <span className={classes.TextGray}>{email}</span>
        </div>
        <div className={classes.BtnBeOwner}>
          {emailVerified ? (
            <BtnMedium btnType="Green" clicked={addCoffeeShop}>
              Add Coffee Shop
            </BtnMedium>
          ) : (
            <BtnMedium btnType="Green" clicked={() => toBeOwnerHandler()}>
              Verification
            </BtnMedium>
          )}
        </div>
      </div>
    </ProfileCard>
  );
};

export default withRouter(Profile);
