import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import Review from './Review';
import { db } from './firebase';   
//import { getEateryDetails } from ;

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
    // get correct eatery from link?????? const 
    // Reviews
    const [reviews, setReviews] = useState<Review[]>([]);


    useEffect(() => {
        // Fetch eatery info
        const fetchData = async () => 
        axios.get(`https://localhost:8080/api/eateries/morrisonDining`)
        .then(response => {
            setEatery(response.data);
        }) .catch(error => {console.error('There was an error fetching eatery info: ', error)});

        // Fetch reviews
        axios.get(`https://localhost:8080/api/reviews/review`)
        .then(response => {
            setReviews(response.data);
        }) .catch((error) => {console.error('There was an error fetching reviews: ', error)});
    }, [eateryId]);

    // Review submissions
    const handleReviewSubmit = (newReview: { userName: string; rating: number; comment: string }) => {
        // Send review to server and update reviews
        axios.post(`http://localhost:8080/api/eateries/morrisonDining/reviews`, newReview)
        .then((response) => {
            // Add review
            setReviews((prevReviews: Review[]) => [...prevReviews, response.data]);
        })
        .catch((error) => {
            console.error('There was an error submitting the review: ', error);
        });
    };


    return (
        <div>
            {eatery ?(
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
                        <p> No reviews yet</p>
                    )}

                    {eateryId && (
                        <Review 
                        eateryId={eateryId} onReviewSubmit={() => {
                            // Re-fetch reviews after a new review is submitted
                            axios.get(`http://localhost:8080/api/eateries/${eateryId}/reviews`)
                                .then(response => {
                                    setReviews(response.data);
                                })
                                .catch(error => {
                                    console.error('There was an error fetching reviews: ', error);
                                });
                        }} 
                        />
                    )}
                </div>
                ) : (
                 <p>Loading eatery...</p>
             )}
          </div>
        );
    };

export default EateryInfoPage