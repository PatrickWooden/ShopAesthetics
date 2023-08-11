/* Created By: Patrick Wooden | 2023-July-16 */
import React, { useEffect, useState } from 'react';
import "./ratings-reviews.css";
import { getReview, createReview, editReview } from '../../../../api';
import ResponsiveStarRating from './rating';
import { useNavigate } from 'react-router-dom';

//create review returns a form with a field for the users cards cvv, two select menus for updating the expiry data and a address field for the suer to enter a new address.
const CreateReview = ({ onClose, selectedAdId }) => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  //local state variables 
  const [star_rating, setRating] = useState(0);
  const ad_id = selectedAdId;
  const [reviewId, setId] = useState('');
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [existingReview, setExistingReview] = useState(false);
  const navigate = useNavigate();
  
  //use effect gets the current reviews data if a review for the product already exists
  useEffect(() => {
    const fetchReview = async () => {
      const reviewExists = await getReview(user_id, selectedAdId);
      if (reviewExists) {
        if (!reviewExists.address) {
          setRating(reviewExists.star_rating);
          setTitle(reviewExists.title);
          setReview(reviewExists.review);
          setExistingReview(true);
          setId(reviewExists._id);
        }
      }
    };

    fetchReview();
  }, [selectedAdId, user_id]);

  //event handlers to update locat states/ submit updated review request when input is updated/ save review is clicked
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (newValue) => {
    setRating(newValue);
  }

  const handleCreateReview = async () => {
    if (!star_rating || !title || !review) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const reviewData = {
        user_id, ad_id, star_rating, title, review
      };

      if (existingReview) {
        await editReview(reviewId, reviewData);
        alert('Review edited successfully');
        navigate("/orders#reviews")
        onClose();
      } else {
        await createReview(reviewData);
        alert('Review created successfully');
        navigate("/orders#reviews")
        onClose();
      }
    } catch (error) {
      alert('Failed to add review');
      return error;
    }
  };

  return (
    <div className="reviewOverlay">
      <div className="reviewContent">
        <h2 className="reviewHeading">Review</h2>
        <form className="reviewForm">
          <div className="formRow">
            <div className="ratingContainer">
                <ResponsiveStarRating value={star_rating} handleRatingChange={handleRatingChange} />
              </div>
          </div>
          <div className="formRow">
            <label className="reviewLabel">Review Title:</label>
            <input
              className="reviewTextArea"
              id="firstNameInput"
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="formRow">
            <label className="reviewLabel">Review:</label>
            <textarea
              className="reviewTextArea"
              id="lastNameInput"
              type="text"
              rows={4}
              value={review}
              onChange={handleReviewChange}
            />
          </div>
          <div className="postAd-button formRow">
            <button type="button"onClick={handleCreateReview}>
              Submit Review
            </button>
          </div>
          <div className="postAd-button formRow">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReview;
