import { db } from '../firebase';
import * as firebase from 'firebase-admin';

export interface ReviewForm {
    rating: number;
    comment: string;
    userId: string;
}

// Add a new review to Firestore dynamically using eateryId parameter
export const addReview = async (eateryId: string, reviewData: ReviewForm) => {
    try {
        // Create a new document in the 'reviews' collection, nested under the eateryId
        const reviewRef = db.collection('reviews').doc(eateryId).collection('reviews').doc();

        // Store the review data in Firestore under the eateryId
        await reviewRef.set({
            ...reviewData, // Includes key-value pairs in the object to be saved
            eateryId: eateryId, // Reference the specific eatery
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        return reviewRef.id;
    } catch (error) {
        console.error("Error adding review: ", error);
        throw new Error("Failed to add review");
    }
};

// Delete a review from Firestore by reviewId
export const deleteReview = async (eateryId: string, reviewId: string) => {
    try {
        // Reference to the specific review document in the 'reviews' collection for a given eatery
        const reviewRef = db.collection('reviews').doc(eateryId).collection('reviews').doc(reviewId);

        // Delete the review document
        await reviewRef.delete();
        console.log(`Review with ID ${reviewId} successfully deleted.`);
    } catch (error) {
        console.error("Error deleting review: ", error);
        throw new Error("Failed to delete review");
    }
};

// Update a review in Firestore by reviewId
export const updateReview = async (eateryId: string, reviewId: string, updateData: ReviewForm) => {
    try {
        // Reference to the specific review document in the 'reviews' collection for a given eatery
        const reviewRef = db.collection('reviews').doc(eateryId).collection('reviews').doc(reviewId);

        // Update the review document with new data
        await reviewRef.update({
            ...updateData,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log(`Review with ID ${reviewId} successfully updated.`);
    } catch (error) {
        console.error("Error updating review: ", error);
        throw new Error("Failed to update review");
    }
};

// Fetch all reviews for a specific eateryId
export const getReviews = async (eateryId: string) => {
    try {
        // Query the 'reviews' collection for documents under the specific eateryId
        const reviewsSnapshot = await db
            .collection('reviews')
            .doc(eateryId)
            .collection('reviews')
            .orderBy('timestamp', 'desc') // Optional: Order by most recent first
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
