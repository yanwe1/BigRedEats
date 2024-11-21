import { db } from '../firebase';

// get morrison details by id
export const getEateryDetails = async (eateryId: string) => {
    const doc = await db.collection('eateries').doc(eateryId).get();
    return doc.exists ? doc.data() : null;
}
;