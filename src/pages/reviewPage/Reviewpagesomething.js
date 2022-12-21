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
<>
        <section className="mainSection">
        <div className="header">
            <h1>Review Page</h1>
            <h4>Here you can see how everyone reviewed our services!</h4>
            <h4>Be sure to leave one yourself by completing the form below!</h4>
        </div>
                <section>

                <div className="reviewForm">
                
                <div className="reviewInputBoxes">
                    <input id="text" type="text"  required></input>
                    <span>Title</span>
                </div>
                
                <div className="reviewInputBoxes">
                    <input id="text" type="text" required></input>
                    <span>Text</span>
                </div>

                <select required>
                    <option value="1">★</option>
                    <option value="2">★★</option>
                    <option value="3">★★★</option>
                    <option value="4">★★★★</option>
                    <option value="5">★★★★★</option>
                </select>

                    <button >Post</button>
                </div>

                {/* <div className="reviewGrid">
                        <Hello />                
                </div> */}

                </section>
        </section>    
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
</>
    )
}