import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router'

import MiniLists from "../../../components/MiniLists/MiniLists";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actions from "../../../store/actions";

const SuggestionList = props => {

  const coffeeShopId = props.match.params.id
  const dispatch = useDispatch();
  const getCoffeeShopList = useCallback(
    () => dispatch(actions.getAllCoffeeShopList()),
    [dispatch]
  );

  useEffect(() => {
    getCoffeeShopList();
  }, []);

  const coffeeShopList = useSelector(state => state.allCoffeeShopList.lists);

  if (!coffeeShopList) return <Spinner />;

  const filteredCoffeeShopList = coffeeShopList.filter(
    (list, index) => list.id !== coffeeShopId && index < 6
  );
  return (
    <MiniLists
      headerList="You might also like"
      coffeeShopList={filteredCoffeeShopList}
    />
  );
};

export default withRouter(SuggestionList)