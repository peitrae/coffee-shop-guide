import React from "react";

import SqueareFaceHappyIcon from "../../../../assets/icon/SqueareFaceHappyIcon";
import SquareFaceSmilingIcon from "../../../../assets/icon/SquareFaceSmilingIcon";
import SquareFaceSadSleepyIcon from "../../../../assets/icon/SquareFaceSadSleepyIcon";
import SquareFaceSadIcon from "../../../../assets/icon/SquareFaceSadIcon";
import SquareFaceDoubtIcon from "../../../../assets/icon/SquareFaceDoubtIcon";
import ProfileImg from "../../../../assets/logo/defaultProfile.png";

import "./ReviewItem.scss";

const ReviewItem = ({ userReview }) => {
  const { name, photoURL, rating, review, date = null } = userReview;

  const getRatingIcon = (rating) => {
    if (rating > 0 && rating <= 1) {
      return <SquareFaceSadSleepyIcon />;
    } else if (rating > 1 && rating <= 2) {
      return <SquareFaceSadIcon />;
    } else if (rating > 2 && rating <= 3) {
      return <SquareFaceDoubtIcon />;
    } else if (rating > 3 && rating <= 4) {
      return <SquareFaceSmilingIcon />;
    } else {
      return <SqueareFaceHappyIcon />;
    }
  };

  return (
    <div className="coffeeshop-review-item">
      <div className="review-user">
        <img
          className="review-user-img"
          src={photoURL ? photoURL : ProfileImg}
          alt={name}
        />
        <div className="review-user-details">
          <span className="review-user-name">{name}</span>
          <span className="review-user-date">{date}</span>
        </div>
      </div>
      <div className="review-main">
        <div className={`review-main-rating rating-${rating[2]}`}>
          <div className="rating-icon">{getRatingIcon(rating[2])}</div>
          <div className="rating-result">{`${rating[2]}/5`}</div>
        </div>
        <div className="review-main-text">{review}</div>
      </div>
    </div>
  );
};

export default ReviewItem;
