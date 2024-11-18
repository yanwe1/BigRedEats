import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import Review from './Review';

interface Eatery {
    id: string;
    name: string;
    location: string;
    imageLink: string; // url to image
}
interface Review {
    id: string
    userName: string; // name of user
    rating: number; // rating out of 5
    comment: string // user comment
}

const EateryInfoPage: React.FC = () => {
    const { eateryId } = useParams<{ eateryId: string}>();
    const [eatery, setEatery] = useState<Eatery | null>(null);
    
    // Reviews
    const [reviews, setReviews] = useState<Review[]>([]);


    useEffect(() => {
        // Fetch eatery info
        const fetchEateryDetails = async () => {
            try {
                const response = await fetch(`https://localhost:8080/api/eateries/${eateryId}`)
                if(response.ok) {
                    const data = await response.json();
                    setEatery(data.data);
                } else {
                    console.error('Error fetching eatery details')
                }
            } catch(error) {
                console.error('There was an error fetching eatery info: ', error);
            }
        };
        // Fetch reviews
        const fetchReviews = async () => {
            try {
                const response = await fetch(`https://localhost:8080/api/reviews/${eateryId}`)
                if(response.ok) {
                    const data = await response.json();
                    setReviews(data.data);
                } else {
                    console.error('Error fetching review');
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        if(eateryId) {
            fetchEateryDetails();
            fetchReviews();
        }
    }, [eateryId]);

    // Review submissions
    const handleReviewSubmit = async (newReview: { userName: string; rating: number; comment: string }) => {
        // Send review to server and update reviews
        try {
            const response = await fetch(`http://localhost:8080/api/addReview/${eateryId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview),
            });
            if (response.ok) {
                const data = await response.json();
                const createdReview = data.data;
                console.log('Review added successfully:', data);
                setReviews((prevReviews) => [...prevReviews, createdReview]); // Optimistically update the reviews
            } else {
                console.error('Error adding review');
            }
        } catch (error) {
            console.error('There was an error submitting the review:', error);
        }
    };

    return (
        <div>
            {eatery ? (
                <div>
                    <h1>{eatery.name}</h1> 
                    <p>{eatery.location}</p>
                    <img src={eatery.imageLink} alt={eatery.name}/>
                    <h3>Reviews:</h3>
                    {reviews.length > 0 ? (
                         reviews.map((review) => (
                            <div key={review.id}>
                                <h4>{review.userName}: {review.rating} stars</h4>
                                <p>{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet</p>
                    )}

                    {eateryId && <Review eateryId={eateryId} onReviewSubmit={handleReviewSubmit} />}    

                    
                </div>
                ) : (
                 <p>Loading eatery...</p>
             )}
          </div>
        );
    };

export default EateryInfoPage

// import React, { useState, useEffect } from 'react';
// import { useParams} from 'react-router-dom';
// import axios from 'axios';
// import Review from './Review';
// // import { db } from '../firebase';
// //import { getEateryDetails } from ;


// interface Eatery {
//     id: string;
//     name: string;
//     location: string;
//     imageLink: string; // url to image
// }
// interface Review {
//     id: string
//     userName: string; // name of user
//     rating: number; // rating out of 5
//     comment: string // user comment
// }

// const EateryInfoPage: React.FC = () => {
//     const { eateryId } = useParams<{ eateryId: string}>();
//     const [eatery, setEatery] = useState<Eatery | null>(null);
//     // get correct eatery from link?????? const 
//     // Reviews
//     const [reviews, setReviews] = useState<Review[]>([]);


//     useEffect(() => {
//         // Fetch eatery info
//         const fetchData = async () => 
//         axios.get(`https://localhost:8080/api/eateries/morrisonDining`)
//         .then(response => {
//             setEatery(response.data);
//         }) .catch(error => {console.error('There was an error fetching eatery info: ', error)});

//         // Fetch reviews
//         axios.get(`https://localhost:8080/api/reviews/review`)
//         .then(response => {
//             setReviews(response.data);
//         }) .catch((error) => {console.error('There was an error fetching reviews: ', error)});
//     }, [eateryId]);

//     // Review submissions
//     const handleReviewSubmit = (newReview: { userName: string; rating: number; comment: string }) => {
//         // Send review to server and update reviews
//         axios.post(`http://localhost:8080/api/eateries/morrisonDining/reviews`, newReview)
//         .then((response) => {
//             // Add review
//             setReviews((prevReviews: Review[]) => [...prevReviews, response.data]);
//         })
//         .catch((error) => {
//             console.error('There was an error submitting the review: ', error);
//         });
//     };


//     return (
//         <div>
//             {eatery ?(
//                 <div>
//                     <h1>{eatery.name}</h1> 
//                     <p>{eatery.location}</p>
//                     <img src={eatery.imageLink} alt={eatery.name}/>
//                     <h3>Reviews:</h3>
//                     {reviews.length > 0 ? (
//                          reviews.map((review) => (
//                             <div key={review.id}>
//                                 <h4>{review.userName}: {review.rating} stars</h4>
//                                 <p>{review.comment}</p>
//                             </div>
//                         ))
//                     ) : (
//                         <p> No reviews yet</p>
//                     )}

//                     {eateryId && (
//                         <Review 
//                         eateryId={eateryId} onReviewSubmit={() => {
//                             // Re-fetch reviews after a new review is submitted
//                             axios.get(`http://localhost:8080/api/eateries/${eateryId}/reviews`)
//                                 .then(response => {
//                                     setReviews(response.data);
//                                 })
//                                 .catch(error => {
//                                     console.error('There was an error fetching reviews: ', error);
//                                 });
//                         }} 
//                         />
//                     )}
//                 </div>
//                 ) : (
//                  <p>Loading eatery...</p>
//              )}
//           </div>
//         );
//     };

// export default EateryInfoPage