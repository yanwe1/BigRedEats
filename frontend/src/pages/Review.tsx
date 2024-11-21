import React, { useState } from 'react';

interface ReviewForm {
    eateryId: string;
    onReviewSubmit: (newReview: { userName: string; comment: string; rating: number }) => void;
}

const Review: React.FC<ReviewForm> = ({ eateryId, onReviewSubmit }) => {
    const [userName, setUserName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0); // allows 0 stars

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const newReview = { userName, comment, rating };

        try {
            // Use the fetch API to send the POST request to the Express server
            const response = await fetch(`http://localhost:8080/api/eateries/${eateryId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview),
            });

            if (response.ok) {
                onReviewSubmit(newReview); // Update reviews on successful submission

                // Reset the form fields
                setUserName('');
                setComment('');
                setRating(0);
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
                <h1 style={{ color: '#FF1493' }}>Review Submission!</h1>
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
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="comment">Review</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Review..."
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating (0-5)</label>
                        <input
                            type="number"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            placeholder="Rating"
                            min="0"
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
