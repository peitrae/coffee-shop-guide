import React from "react";

import Modal from "../../../../../../../../components/UI/Modal";
import ErrorMessage from "../../../../../../../../components/ErrorMessage";
import { Button } from "../../../../../../../../components/UI/Button";
import TextArea from "../../../../../../../../components/UI/TextArea";

const Review = ({
  errorMessage,
  question,
  review,
  handleReviewChange,
  handleSubmit,
  handlePrevQuestion,
  handleClose,
}) => (
  <Modal className="add-review" handleClose={handleClose}>
    <h1 className="h1 add-review__title">Rating</h1>
    {errorMessage ? (
      <ErrorMessage className="add-review__error">{errorMessage}</ErrorMessage>
    ) : null}
    <form className="add-review__form">
      <span className="add-review__question">{question}</span>
      <TextArea
        placeholder="Leave a review for others"
        value={review}
        onChange={handleReviewChange}
      />
    </form>
    <div className="add-review__controls">
      <Button type="text" size="sm" onClick={handlePrevQuestion}>
        Previous
      </Button>
      <Button type="text" size="sm" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  </Modal>
);

export default Review;
