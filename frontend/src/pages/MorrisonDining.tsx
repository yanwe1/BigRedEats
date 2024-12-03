import React, { useEffect, useState } from 'react';
import { db } from '../components/auth/firebaseConfig';
import { collection, getDocs, doc, addDoc } from 'firebase/firestore';


const MorrisonDining: React.FC = () => {
  const [morrisonReviews, setMorrisonReviews] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {

    // Fetch reviews for Morrison from Firestore
    const fetchMorrisonReviews = async () => {
      try {
        const reviewsDocRef = doc(db, 'morrisonDining', 'reviews');
        const reviewsCollection = collection(reviewsDocRef, 'reviews');
        const snapshot = await getDocs(reviewsCollection);
        const reviews = snapshot.docs.map((doc) => doc.data());
        setMorrisonReviews(reviews);
      } catch (error) {
        console.error('Error fetching Morrison reviews:', error);
      }
    };

    fetchMorrisonReviews();
  }, []);

  // Handle review submission
  const handleReviewSubmit = async (newReview: { userName: string; rating: number; comment: string }) => {
    try {
      const reviewsDocRef = doc(db, 'morrisonDining', 'reviews');
      const reviewsCollection = collection(reviewsDocRef, 'reviews');
      const response = await addDoc(reviewsCollection, newReview);
      if (response) {
        setMorrisonReviews((prevReviews) => [...prevReviews, newReview]);
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  // Filter reviews based on search query
  const filteredReviews = morrisonReviews.filter(
    (review) =>
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ paddingLeft: '20px' }}>
      <h1>Morrison Dining</h1>
          <img
            src={"/images/morrison.jpg"} // Local image 
            style={{ width: '500px', height: 'auto' }}
          />
        <p>Location: Toni Morrison Hall</p>
        <p>Choose your own culinary adventure at Cornell's newest dining room.</p>
      

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

export default MorrisonDining;