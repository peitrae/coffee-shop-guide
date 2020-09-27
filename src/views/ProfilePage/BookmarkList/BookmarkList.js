import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MiniList from "../../../components/MiniList/MiniList";
import * as actions from "../../../store/actions";

const BookmarkList = () => {
  const dispatch = useDispatch();

  const bookmarkIds = useSelector((state) => state.member.bookmark);
  const bookmark = useSelector((state) => state.coffeeShop.bookmark);

  useEffect(() => {
    dispatch(actions.getBookmark(bookmarkIds));
  }, [dispatch, bookmarkIds]);

  const unbookmarkClickHandler = (coffeeShop_id) => {
    const unbookmarkId = bookmarkIds.indexOf(coffeeShop_id);

    if (unbookmarkId > -1) {
      bookmarkIds.splice(unbookmarkId, 1);
      dispatch(actions.setBookmark(bookmarkIds));
    }
  };

  if (bookmarkIds.length) {
    return (
      <MiniList
        title="Bookmark"
        list={bookmark}
        deleteHandler={unbookmarkClickHandler}
      />
    );
  } else {
    return null;
  }
};

export default BookmarkList;
