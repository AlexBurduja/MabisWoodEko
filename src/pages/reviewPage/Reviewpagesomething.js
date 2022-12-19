import React from "react"
import { useEffect, useState } from "react"
import { ReviewPageComponent } from "./ReviewPageComponent"


export function Reviewpagesomething(){

    const [review, setReview] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3001/reviews')
        .then(response => response.json())
        .then ((reviews) => setReview(reviews))
    }, [])


    return (
        <div>
        {review.map((reviews) => {
            return (
                <ReviewPageComponent
                reviewTitle={reviews.reviewTitle}
                reviewText = {reviews.reviewText}
                rating = {reviews.reviewRating}
                firstName={reviews?.userFirstName}
                lastName={reviews.userLastName}
                id={reviews.id}>
                </ReviewPageComponent>
            )
        })}
        </div>
    )
}