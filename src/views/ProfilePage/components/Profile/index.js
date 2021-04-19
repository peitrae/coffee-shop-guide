import React from "react";
import { useHistory } from "react-router";

import Card from "../../../../components/UI/Card";
import { Button } from "../../../../components/UI/Button";
import defaultProfile from "../../../../assets/logo/defaultProfile.png";

const Profile = ({
  profile,
  handleShowEditProfile,
  handleShowEditPassword,
  handleShowVerification,
  handleShowEditPreference,
}) => {
  const history = useHistory();

  const { name, email, emailVerified, photoUrl } = profile;

  const handleAddCoffeeShop = () => history.push("/add-coffeeshop");

  return (
    <Card className="profile" shadow={true}>
      <div className="profile__header">
        <img
          src={photoUrl || defaultProfile}
          alt="Profile"
          className="profile__image profile__image--main"
        />
      </div>
      <div className="profile__body">
        <div className="profile__actions">
          <Button size="sm" type="text" onClick={handleShowEditProfile}>
            Edit Profile
          </Button>
          <Button size="sm" type="text" onClick={handleShowEditPassword}>
            Edit Password
          </Button>
          <Button size="sm" type="text" onClick={handleShowEditPreference}>
            Edit Preference
          </Button>
        </div>
        <div>
          <span className="profile__text profile__text--primary">{name}</span>
          <span className="profile__text profile__text--secondary">
            {email}
          </span>
        </div>
        <div>
          {emailVerified ? (
            <Button onClick={handleAddCoffeeShop}>Add Coffee Shop</Button>
          ) : (
            <Button onClick={handleShowVerification}>Verification</Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Profile;
