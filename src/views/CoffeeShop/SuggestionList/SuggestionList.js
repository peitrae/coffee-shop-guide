import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";

import MiniList from "../../../components/MiniList/MiniList";
import * as actions from "../../../store/actions";

const SuggestionList = props => {
  const coffeeShopId = props.match.params.id;
  const dispatch = useDispatch();
  const getCoffeeShopList = useCallback(
    () => dispatch(actions.getAllCoffeeShopList()),
    [dispatch]
  );

  useEffect(() => {
    getCoffeeShopList();
  }, [getCoffeeShopList]);

  const coffeeShopList = useSelector(state => state.allCoffeeShopList.lists);

  if (!coffeeShopList) return <MiniList title="You might also like" list={[]}/>;

  const filteredCoffeeShopList = coffeeShopList.filter(
    (list, index) => list.id !== coffeeShopId && index < 6
  );

  return (
    <MiniList
      headerList="You might also like"
      list={filteredCoffeeShopList}
    />
  );
};

export default withRouter(SuggestionList);
