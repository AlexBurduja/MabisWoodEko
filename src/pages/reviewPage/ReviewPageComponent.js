import { useEffect, useState } from "react"
import React from "react"
import { RiContactsBookLine } from "react-icons/ri";


export function ReviewPageComponent() {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/reviews")
        .then(response => response.json())
        .then((reviewList) => { setReviews(reviewList) 
            
            function Rating() {
                for(let i = 0; i < reviewList.length; i++){
                    let obj = reviewList[i]
                    console.log(obj.reviewRating)
                    
                    if (obj.reviewRating === 2) {
                        return <p>Hey</p>
                    } else {
                        return <p>Plm</p>
                    }
    
                }
            }

            
        })}, [] ); 

    return(
        <>
        {reviews.map((item) => {
            return (
                <>

                <p>
                    {item.reviewText}
                </p>

                <p>
                    {item.reviewRating}
                </p>
                
                <Rating />
                </>
            )
        })}
        </>
    )
}