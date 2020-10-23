import React from "react";

import List from "./List/List";
import Footer from "../../components/UI/Footer/Footer";

import "./Search.scss";

const Search = () => {
  return (
    <>
      <div className="search-result">
        <List />
      </div>
      <Footer />
    </>
  );
};

export default React.memo(Search);
