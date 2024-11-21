import { db } from '../firebase';
import * as firebase from 'firebase-admin';

export interface ReviewForm {
    rating: number;
    comment: string;
    userId: string;
  }

// add a new review to firestore dynamically using eateryId parameter
export const addReview = async (eateryId : string, reviewData : ReviewForm) => {
    try {
        // create a new document in the 'reviews' collection
        const reviewRef = db.collection('reviews').doc();

        // create review data with set function and stores in firestore doc; link it to eateryId
        await reviewRef.set({
            ...reviewData, // includes key value pairs in the object to be saved in document
            eateryId: eateryId, // reference the specific eatery
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        return reviewRef.id;
    }

    catch (error) {
        console.error("Error adding review: ", error);
        throw new Error("Failed to add review");
    }
}

// delete a review from firestore by reviewid
export const deleteReview = async (review: string) => {
    try {
        // reference to the specific review document in the 'reviews' collection
        const reviewRef = db.collection('reviews').doc(review);

        // delete the review document
        await reviewRef.delete();

        console.log(`Review with ID ${review} successfully deleted.`);

    }

    catch (error) {
        console.error("Error deleting review: ", error);
        throw new Error("Failed to delete review");
    }
};

// update a review in firestore by review
export const updateReview = async (review : string, updateData : ReviewForm) => {
    try {
        // reference to the specific review document in the 'reviews' collection
        const reviewRef = db.collection('reviews').doc(review);

        // update the review document with new data
        await reviewRef.update({
            ...updateData,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });
       
        console.log(`Review with ID ${review} successfully updated.`);
    }
        catch (error) {
            console.error("Error updating review: ", error);
            throw new Error("Failed to update review");
        }
};

// Fetch all reviews for a specific eateryId
export const getReviews = async (eateryId: string) => {
    try {
      // Query the 'reviews' collection for documents where 'eateryId' matches
      const reviewsSnapshot = await db
        .collection('reviews')
        .where('eateryId', '==', eateryId)
        .orderBy('timestamp', 'desc') // Optional: order by most recent first
        .get();
  
      // Extract and return the reviews data
      const reviews = reviewsSnapshot.docs.map(doc => ({
        id: doc.id, // Include the document ID for reference
        ...doc.data(),
      }));
  
      return reviews;
    } catch (error) {
      console.error("Error fetching reviews: ", error);
      throw new Error("Failed to fetch reviews");
    }
  };
  