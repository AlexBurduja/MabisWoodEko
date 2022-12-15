import { useEffect, useState } from "react"
import { ReviewPageComponent } from "./ReviewPageComponent"


export function Reviewpagesomething(){

    const [review, setReview] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3001/reviews')
        .then(response => response.json())
        .then (reviews => setReview(reviews))
    }, [])

    return (
        <>
        {review.map((review) => {
            return (
                <ReviewPageComponent
                id={review.id}>
                </ReviewPageComponent>
            )
        })}
        </>
    )
}