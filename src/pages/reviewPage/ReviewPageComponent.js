import { useEffect, useState } from "react"
import React from "react"
import { IoMdTennisball } from "react-icons/io";


export function ReviewPageComponent() {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/reviews")
        .then(response => response.json())
        .then((reviewList) => {
            setReviews(reviewList)

        })}, [] ); 

    const Hello = () => {
        return (
            reviews.map(item =>
                {
                    if(item.reviewRating === 2){
                      return   <p>Second</p>
                    }
                    
                    if (item.reviewRating === 1) {
                        return <p>First</p>
                    }
            }
        )
    )
}
    
        
        
               
    


    return(
        <>
        {reviews.map((item) => {
            return (
                <>
                <div>
                    <p>{item.reviewText}</p>
                    <p>{item.reviewRating}</p>
                </div>
                <Hello />
                </>
            )
        })}
        </>
    )
}