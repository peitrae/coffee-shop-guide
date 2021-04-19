import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Card from "../../../../components/UI/Card";
import ReviewItem from "./components/ReviewItem";
import Spinner from "../../../../components/UI/Spinner";

const Loading = () => (
  <Card className="review">
    <Spinner />
  </Card>
);

const Review = () => {
  const reviews = useSelector((state) => state.coffeeShop.data.reviews);

  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserReviews = async () => {
      setLoading(true);
      const userIds = Object.keys(reviews);

      try {
        const {
          data: { users },
        } = await axios.post(process.env.REACT_APP_FUNCTIONS, { userIds });

        const userReviews = users.map((user) => ({
          name: user.displayName,
          photoUrl: user.photoURL,
          user_id: user.uid,
          ...reviews[user.uid],
        }));

        setUserReviews(userReviews);
        setLoading(false);
      } catch (error) {
        console.log("Error", error);
      }
    };

    if (reviews) {
      getUserReviews();
    }
  }, [reviews]);

  if (!reviews) {
    return null;
  } else if (reviews && loading) {
    return <Loading />;
  }

  return (
    <Card className="review">
      <h2 className="h2 c-primary margin-b-16">Review</h2>
      <div>
        {userReviews.map((review) => (
          <ReviewItem key={review.user_id} value={review} />
        ))}
      </div>
    </Card>
  );
};

export default Review;
