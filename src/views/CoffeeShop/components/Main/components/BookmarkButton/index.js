import React from "react";

import BookmarkIcon from "../../../../../../assets/icon/BookmarkIcon";

const BookmarkButton = ({ handleBookmark, isBookmarked }) => (
  <button className="btn-icon-only" onClick={handleBookmark}>
    <BookmarkIcon
      fill={isBookmarked ? "#219653" : "none"}
      color={isBookmarked ? "#219653" : undefined}
    />
  </button>
);

export default BookmarkButton;
