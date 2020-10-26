import React from "react";

import SqueareFaceHappyIcon from "../../../../assets/icon/SqueareFaceHappyIcon";
import SquareFaceSmilingIcon from "../../../../assets/icon/SquareFaceSmilingIcon";
import SquareFaceSadSleepyIcon from "../../../../assets/icon/SquareFaceSadSleepyIcon";
import SquareFaceSadIcon from "../../../../assets/icon/SquareFaceSadIcon";
import SquareFaceDoubtIcon from "../../../../assets/icon/SquareFaceDoubtIcon";

import "./ReviewItem.scss";

const ReviewItem = ({ userReview }) => {
  const { userId, rating, review } = userReview;

  return (
    <div className="coffeeshop-review-item">
      <div className="review-user">
        <div className="review-user-img"></div>
        <div className="review-user-details">
          <span className="review-user-name">{userId}</span>
          <span className="review-user-date">27 Oktober 2019</span>
        </div>
      </div>
      <div className="review-main">
        <div className="review-main-rating">
          <div className="rating-icon">
            <SqueareFaceHappyIcon />
          </div>
          <div className="rating-result">{`${rating[2] * 2}/10`}</div>
        </div>
        <div className="review-main-text">{review}</div>
      </div>
    </div>
  );
};

export default ReviewItem;
