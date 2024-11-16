import { db } from '../server';

// get morrison details by id
export const getEateryDetails = async (eateryId: string) => {
    const doc = await db.collection('eateries').doc(eateryId).get();
    return doc.exists ? doc.data() : null;
}

console.log('help');