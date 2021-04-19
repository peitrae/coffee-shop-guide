import React from "react";

import { Button } from "../../../../../../components/UI/Button";

const FilterButton = ({ children, active, onClick = () => {} }) => (
  <Button
    type="outlined"
    size="sm"
    className={`search-filter__btn ${
      active ? "search-filter__btn--active" : ""
    }`}
    onClick={onClick}
  >
    {children}
  </Button>
);

export default FilterButton;
