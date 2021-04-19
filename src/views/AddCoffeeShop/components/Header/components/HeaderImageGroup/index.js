import React from "react";

import Spinner from "../../../../../../components/UI/Spinner";
import Backdrop from "../../../../../../components/UI/Backdrop";
import EditButton from "./components/EditButton";

const HeaderImageGroup = ({
  header,
  headerUploading,
  handleHeaderChange = () => {},
}) => (
  <div className="header__img-grp">
    <img src={header} alt="Coffee Shop Header" className="header__img" />
    {headerUploading ? (
      <Backdrop>
        <Spinner color="white" />
      </Backdrop>
    ) : (
      <EditButton onChange={handleHeaderChange} className="header__btn-edit" />
    )}
  </div>
);

export default HeaderImageGroup;
