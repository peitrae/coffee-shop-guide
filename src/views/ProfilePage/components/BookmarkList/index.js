import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MiniList from "../../../../components/MiniList";
import * as actions from "../../../../store/actions";

const BookmarkList = ({ bookmarkIds }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const bookmarkedCoffeeShop = useSelector(
    ({ coffeeShop }) => coffeeShop.bookmark
  );

  useEffect(() => {
    dispatch(actions.getBookmark(bookmarkIds));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bookmarkIds.length !== bookmarkedCoffeeShop.length) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [bookmarkIds, bookmarkedCoffeeShop]);

  const handleUnbookmark = (coffeeShopId) => {
    const unbookmarkId = bookmarkIds.indexOf(coffeeShopId);

    if (unbookmarkId > -1) {
      bookmarkIds.splice(unbookmarkId, 1);
      dispatch(actions.setBookmark(bookmarkIds));
      dispatch(actions.getBookmark(bookmarkIds));
    }
  };

  if (!bookmarkIds || !bookmarkIds.length) {
    return null;
  }

  return (
    <MiniList
      loading={loading}
      title="Bookmark"
      list={bookmarkedCoffeeShop}
      handleDelete={handleUnbookmark}
      className="margin-l-24"
    />
  );
};

export default BookmarkList;
