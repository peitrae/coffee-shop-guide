import React from "react";

import Filter from "../../components/Filter/Filter";
import BestRecommendation from "../../components/BestRecommendation/BestRecommendation";
import Blank from "../../components/Blank/Blank";
import style from "./Search.module.css";
import RecommendationLists from "../../components/RecommendationLists/RecommendationLists";

const Search = props => {
  return (
    <div className={style.Search}>
      <Filter />
      <div className={style.Recommendation}>
        <div>
          <BestRecommendation
            className={style.BestRecommendation}
            image={"./Starbuck3.png"}
            name={"Starbucks"}
            address={"Malang City Point (Jl. Raya Dieng No. 31)"}
            openingHour={"07.00"}
            closingHour={"22.00"}
            averagePrice={"Rp50.000"}
            moreInformation={""}
          />
        </div>
        <RecommendationLists
          image={"./JavaDancerCoffee1.png"}
          name={"Java Dancer Coffee"}
          address={"Jl. Jakarta No. 59 (Jl. Simpang Ijen)"}
          openingHour={"08.00"}
          closingHour={"23.00"}
          averagePrice={"Rp30.000"}
        />
      </div>

      <Blank />
    </div>
  );
};

export default Search;
