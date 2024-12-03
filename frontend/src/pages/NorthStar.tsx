import React, { useEffect, useState } from 'react';
import { db } from '../components/auth/firebaseConfig';
import { collection, getDocs, doc, addDoc } from 'firebase/firestore';

const NorthStar: React.FC = () => {
  const [northStarReviews, setNorthStarReviews] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch reviews for North Star from Firestore
    const fetchNorthStarReviews = async () => {
      try {
        const reviewsDocRef = doc(db, 'northStar', 'reviews');
        const reviewsCollection = collection(reviewsDocRef, 'reviews');
        const snapshot = await getDocs(reviewsCollection);
        const reviews = snapshot.docs.map((doc) => doc.data());
        setNorthStarReviews(reviews);
      } catch (error) {
        console.error('Error fetching North Star reviews:', error);
      }
    };

    fetchNorthStarReviews();
  }, []);

  // Handle review submission
  const handleReviewSubmit = async (newReview: { userName: string; rating: number; comment: string }) => {
    try {
      const reviewsDocRef = doc(db, 'northStar', 'reviews');
      const reviewsCollection = collection(reviewsDocRef, 'reviews');
      const response = await addDoc(reviewsCollection, newReview);

      if (response) {
        setNorthStarReviews((prevReviews) => [...prevReviews, newReview]);
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  // Filter reviews based on search query
  const filteredReviews = northStarReviews.filter(
    (review) =>
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ paddingLeft: '20px' }}>
      <h1>North Star Dining</h1>
          <img
            src={"/images/northStar.jpg"} // Local image 
            style={{ width: '500px', height: 'auto' }}
          />
        <p>Location: Appel Commons, Third floor</p>
        <p>Dining room located in Appel Commons on North Campus.</p>
      

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
            <h4>
              {review.userName}: {review.rating} stars
            </h4>
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