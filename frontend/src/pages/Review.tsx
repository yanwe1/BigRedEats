import React, { useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams hook

interface ReviewForm {
  onReviewSubmit: (newReview: { userName: string; comment: string; rating: number }) => void;
}

const Review: React.FC<ReviewForm> = ({ onReviewSubmit }) => {
  const { eateryId } = useParams<{ eateryId: string }>();  // Get the eateryId from the URL

  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1); // Default rating of 1

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newReview = { userName, comment, rating };

    try {
      // Send the POST request with the review data to the server
      const response = await fetch(`https://BigRedEats.fly.dev/api/addReview/${eateryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        onReviewSubmit(newReview); // Update reviews on successful submission
        setUserName('');
        setComment('');
        setRating(1); // Reset the form
      } else {
        console.error('Error submitting review:', response.statusText);
      }
    } catch (error) {
      console.error('There was an error submitting your review:', error);
    }
  };

  return (
    <div>
      <center>
        <h1 style={{ color: '#FF1493' }}>Review Submission for {eateryId}</h1>
      </center>

      <div className="review-container">
        <h2>Submit Your Review</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Name..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="comment">Review</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Review..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating (1-5)</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              placeholder="Rating"
              min="1"
              max="5"
              required
            />
          </div>

          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default Review;
