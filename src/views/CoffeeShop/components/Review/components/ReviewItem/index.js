import React from "react";
import moment from "moment";

import ProfileImg from "../../../../../../assets/logo/defaultProfile.png";
import EmotionRating from "./components/EmotionRating";

const ReviewItem = ({ value }) => {
  const { name, photoUrl, rating, review_text, created_at } = value;
 
  return (
    <div className="row review-item margin-b-12">
      <div className="review-item__header margin-b-16">
        <div className="review-item__desc">
          <img
            className="review-item__img margin-r-12"
            src={photoUrl ? photoUrl : ProfileImg}
            alt={name}
          />
          <div className="row">
            <span className="review-item__name">{name || "Anonymous"}</span>
            <span className="review-item__date">
              {moment(created_at).format("DD MMMM YYYY")}
            </span>
          </div>
        </div>
        <EmotionRating rating={rating[2]} />
      </div>
      <div className="review-item__text">{review_text}</div>
    </div>
  );
};

export default ReviewItem;
