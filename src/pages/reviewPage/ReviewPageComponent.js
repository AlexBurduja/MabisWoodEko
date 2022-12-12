import { useEffect, useState } from "react"
import React from "react"


export function ReviewPageComponent() {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/reviews")
        .then(response => response.json())
        .then((reviewList) => { setReviews(reviewList)});
        
        
        const Rating = () => {
            for(const rating of reviews) {
                console.log(rating.reviewRating)
                if(rating.reviewRating === 2){
                    return (
                        <p>Rating = 2</p>
                    )
                } else {
                        return (
                            <p>Rating = 4</p>
                        )
                    }
                }
            }
            
        }, [] );  

    return(
        <>
        {reviews.map((item) => {
            return (
                <>

                <p>
                    {item.reviewText}
                </p>
                </>
            )
        })}
        </>
    )
}