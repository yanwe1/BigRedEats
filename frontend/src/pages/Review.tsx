import React, { useState } from 'react';
import axios from 'axios';

interface ReviewForm {
    eateryId: string;
    onReviewSubmit: () => void // Update reviews
}

const Review: React.FC<ReviewForm> = ({ eateryId, onReviewSubmit }) => {
    const [userName, setUserName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0); // allows 0 stars

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const newReview = { userName, comment, rating };

        try {
            await axios.post(`https://localhost:8080/api/eateries/${eateryId}/reviews`, newReview);
            onReviewSubmit(); // Update reviews
            // Reset review fields
            setUserName('');
            setComment('');
            setRating(0);
        } catch (error) {
            console.error('There was an error submitting your review: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <textarea
                placeholder = "Review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <input
                type="number"
                placeholder="Rating 0-5 stars"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
            min="0"
            max="5"
           />       
        <button type="submit">Submit review</button>
     </form>
    );
};

export default Review