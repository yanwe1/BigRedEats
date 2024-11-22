import React, { useEffect, useState } from 'react';
import { db } from '../../../backend/firebase';

const NorthStar: React.FC = () => {
  const [northStarInfo, setNorthStarInfo] = useState<any>(null);
  const [northStarReviews, setNorthStarReviews] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch NorthStar dining hall info from Firestore
    const fetchNorthStarData = async () => {
      try {
        const snapshot = await db.collection('northStar').get();
        const data = snapshot.docs.map(doc => doc.data());
        setNorthStarInfo(data);
      } catch (error) {
        console.error('Error fetching NorthStar data:', error);
      }
    };

    // Fetch reviews for NorthStar from Firestore
    const fetchNorthStarReviews = async () => {
      try {
        const snapshot = await db
          .collection('northStar')
          .doc('reviews')
          .collection('reviews')
          .get();

        const reviews = snapshot.docs.map(doc => doc.data());
        setNorthStarReviews(reviews);
      } catch (error) {
        console.error('Error fetching NorthStar reviews:', error);
      }
    };

    fetchNorthStarData();
    fetchNorthStarReviews();
  }, []);

  // Handle review submission
  const handleReviewSubmit = async (newReview: { userName: string; rating: number; comment: string }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/addReview/northStar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        const data = await response.json();
        const createdReview = data.data;
        setNorthStarReviews((prevReviews) => [...prevReviews, createdReview]);
      } else {
        console.error('Error adding review');
      }
    } catch (error) {
      console.error('There was an error submitting the review:', error);
    }
  };

  // Filter reviews based on search query
  const filteredReviews = northStarReviews.filter(
    (review) =>
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>North Star Dining</h1>
      {northStarInfo ? (
        <div>
          {northStarInfo.map((item: any, index: number) => (
            <div key={index}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <img src={item.imageLink} alt={item.name} />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading North Star Dining information...</p>
      )}

      <h2>Reviews:</h2>
      <input
        type="text"
        placeholder="Search reviews..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredReviews.length > 0 ? (
        filteredReviews.map((review, index) => (
          <div key={index}>
            <h4>{review.userName}: {review.rating} stars</h4>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews match the search query.</p>
      )}

      {/* Review submission form */}
      <div>
        <h3>Submit a Review</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const userName = (e.target as any).userName.value;
            const rating = Number((e.target as any).rating.value);
            const comment = (e.target as any).comment.value;
            handleReviewSubmit({ userName, rating, comment });
          }}
        >
          <input type="text" name="userName" placeholder="Your name" required />
          <input type="number" name="rating" min="1" max="5" placeholder="Rating (1-5)" required />
          <textarea name="comment" placeholder="Your comment" required></textarea>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default NorthStar;
