import { db } from '../firebase';

// Get dining hall details by id
export const getEateryDetails = async (eateryId: string) => {
    try {
        const doc = await db.collection('eateries').doc(eateryId).get();
        return doc.exists ? doc.data() : null;
    } catch (error) {
        console.error("Error fetching eatery details: ", error);
        throw new Error("Failed to fetch eatery details");
    }
};
