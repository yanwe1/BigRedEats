import React, { useEffect, useState } from 'react';
import { db } from '../components/auth/firebaseConfig';
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';


const MorrisonDining: React.FC = () => {
  const [morrisonInfo, setMorrisonInfo] = useState<any[]>([]);
  const [morrisonReviews, setMorrisonReviews] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch Morrison Dining info from Firestore
    const fetchMorrisonData = async () => {
      try {
        const morrisonCollection = collection(db, 'morrisonDining');
        const snapshot = await getDocs(morrisonCollection);
        const data = snapshot.docs.map((doc) => doc.data());
        setMorrisonInfo(data);
      } catch (error) {
        console.error('Error fetching Morrison Dining data:', error);
      }
    };

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

    fetchMorrisonData();
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
    <div>
      <h1>Morrison Dining</h1>
      {morrisonInfo.length > 0 ? (
        <div>
          {morrisonInfo.map((item: any, index: number) => (
            <div key={index}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <img src={item.imageLink} alt={item.name} />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading Morrison Dining information...</p>
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