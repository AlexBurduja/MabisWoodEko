import { useContext, useEffect, useState } from "react"
import React from "react"
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { AuthContext } from "../../App";
import "./ReviewPageComponent.css"



export function ReviewPageComponent() {

    const [reviews, setReviews] = useState([])

    const { auth } = useContext(AuthContext)

    useEffect(() => {
        fetch("http://localhost:3001/reviews",{
        headers:{
            Authorization : `Bearer ${auth.accessToken}`
        }
    })
        .then(response => response.json())
        .then((reviewList) => {
            setReviews(reviewList)

        })}, [] );

        
        const [text, setText] = useState("");

        
function textChange(event){
    setText(event.target.value)
}

function ratingChange(event){
    setSelected(event.target.value)
}

function postHandler(event){
    event.preventDefault()
    
    const body = {
        reviewText: text,
        reviewRating: selected,
        user: auth.user.firstName
    }

    fetch("http://localhost:3001/reviews", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${auth.accessToken}`
        },
        body: JSON.stringify(body)
    })
}


const Hello = () => {
    return (
        reviews.map(item =>
            {
                if (item.reviewRating === "1") {
                    return (
                        <section className="reviewRatingSection">
                        {item.user} said
                        
                        <div>
                        {item.reviewText}    
                        </div>

                        <div className="stars">
                        <RiStarFill /><RiStarLine /><RiStarLine /><RiStarLine /><RiStarLine />
                        </div>
                        </section>
                    )
                }

                if(item.reviewRating === "2"){
                  return  (
                    <section className="reviewRatingSection">
                        {item.user} said
                        
                        <div>
                        {item.reviewText}    
                        </div>

                    <div className="stars">
                        <RiStarFill /><RiStarFill /><RiStarLine /><RiStarLine /><RiStarLine />
                    </div>

                    </section>
                     )
                }

                if(item.reviewRating === "3"){
                    return (
                        <section className="reviewRatingSection">
                        {item.user} said
                        
                        <div>
                        {item.reviewText}    
                        </div>
                            
                        <div className="stars">
                            <RiStarFill /><RiStarFill /><RiStarFill /><RiStarLine /><RiStarLine />
                        </div>

                        </section>
                    )
                }

                if(item.reviewRating === "4"){
                    return (
                        <section className="reviewRatingSection">
                        {item.user} said
                        
                        <div>
                        {item.reviewText}    
                        </div>

                        <div className="stars">
                            <RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill /><RiStarLine />
                        </div>
                        </section>
                    )
                }

                if(item.reviewRating === "5"){
                    return(
                        <section className="reviewRatingSection">
                        {item.user} said
                        
                        <div>
                        {item.reviewText}    
                        </div>

                        <div className="stars">
                            <RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill />
                        </div>
                        </section>
                    )
                }
                
        }
    )
)
};

const options = ["1","2","3","4","5"]
const [selected, setSelected] = useState(options[0])


    return(
        <section className="mainSection">
        <div className="header">
            <h1>Review Page</h1>
            <h4>Here you can see how everyone reviewed our services!</h4>
            <h4>Be sure to leave one yourself by completing the form below!</h4>
        </div>
                <section>

                <div className="reviewForm">
                
                <div className="reviewInputBoxes">
                    <input id="text" type="text" onChange={textChange} required></input>
                    <span>text</span>
                </div>

                <select onChange={ratingChange} required>
                    <option value="1">★</option>
                    <option value="2">★★</option>
                    <option value="3">★★★</option>
                    <option value="4">★★★★</option>
                    <option value="5">★★★★★</option>
                </select>

                    <button onClick={postHandler}>Post</button>
                </div>

                <div className="reviewGrid">
                    <Hello />
                </div>

                </section>
        </section>
    )
}