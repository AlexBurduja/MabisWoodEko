import { useContext, useEffect, useState } from "react"
import React from "react"
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { AuthContext } from "../../App";
import "./ReviewPageComponent.css"
import { useParams } from "react-router-dom";

export function ReviewPageComponent() {

    const [reviews, setReviews] = useState([])

    let id = useParams()

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
        const [title, setTitle] = useState("")
        
function textChange(event){
    setText(event.target.value)
}

function ratingChange(event){
    setSelected(event.target.value)
}

function titleChange(event){
    setTitle(event.target.value)
}

function postHandler(event){
    event.preventDefault()
    
    const body = {
        reviewTitle: title,
        reviewText: text,
        reviewRating: selected,
        userFirstName: auth.user.firstName,
        userLastName: auth.user.lastName,
        user: auth.user.id
    }

    fetch(`http://localhost:3001/reviews/` + id, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${auth.accessToken}`
        },
        body: JSON.stringify(body)
    })
    window.location.reload();
}



function deleteHandler() {
     fetch(`http://localhost:3001/reviews/` + id,{
            
                 method: "DELETE"
             })
}

function Hello(){
    return (
        reviews.map(item => {
                    if (item.reviewRating === "1") {
                        return (
                            <section className="reviewRatingSection">
                            <div className="reviewRatingSection_username">
                                <p>
                                    {item.userLastName + " " + Array.from(item.userFirstName)[0]+"."} <span>said  
                                </span></p> 
                            </div>
                            
                            <div className="reviewRatingSection_title">
                                {item.reviewTitle}
                            </div>

                            <div className="reviewRatingSection_text">
                                {item.reviewText}    
                            </div>

                            <div className="stars">
                            <RiStarFill /><RiStarLine /><RiStarLine /><RiStarLine /><RiStarLine />
                            </div>
                            <button className="reviewDeleteButton" onClick={deleteHandler}>Delete</button>
                            </section>
                        )
                    }

                    if(item.reviewRating === "2"){
                    return  (
                        <section className="reviewRatingSection">
                            <div className="reviewRatingSection_username">
                                <p >
                                    {item.userLastName + " " + Array.from(item.userFirstName)[0]+"."} <span>said  
                                </span></p> 
                            </div>
                            
                            <div className="reviewRatingSection_title">
                                {item.reviewTitle}
                            </div>

                            <div className="reviewRatingSection_text">
                                {item.reviewText}    
                            </div>

                        <div className="stars">
                            <RiStarFill /><RiStarFill /><RiStarLine /><RiStarLine /><RiStarLine />
                        </div>
                        <button className="reviewDeleteButton" onClick={deleteHandler}>Delete</button>
                        </section>
                        )
                    }

                    if(item.reviewRating === "3"){
                        return (
                            <section className="reviewRatingSection">
                            <div className="reviewRatingSection_username">
                                <p >
                                    {item.userLastName + " " + Array.from(item.userFirstName)[0]+"."} <span>said  
                                </span></p> 
                            </div>
                            
                            <div className="reviewRatingSection_title">
                                {item.reviewTitle}
                            </div>

                            <div className="reviewRatingSection_text">
                                {item.reviewText}    
                            </div>
                                
                            <div className="stars">
                                <RiStarFill /><RiStarFill /><RiStarFill /><RiStarLine /><RiStarLine />
                            </div>
                            <button className="reviewDeleteButton" onClick={deleteHandler}>Delete</button>
                            </section>
                        )
                    }

                    if(item.reviewRating === "4"){
                        return (
                            <section className="reviewRatingSection">
                            <div className="reviewRatingSection_username">
                                <p >
                                    {item.userLastName + " " + Array.from(item.userFirstName)[0]+"."} <span>said  
                                </span></p> 
                            </div>
                            
                            <div className="reviewRatingSection_title">
                                {item.reviewTitle}
                            </div>

                            <div className="reviewRatingSection_text">
                                {item.reviewText}    
                            </div>

                            <div className="stars">
                                <RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill /><RiStarLine />
                            </div>
                            <button className="reviewDeleteButton" onClick={deleteHandler}>Delete</button>
                            </section>
                        )
                    }

                    if(item.reviewRating === "5"){
                        return(
                            <section className="reviewRatingSection">
                            <div className="reviewRatingSection_username">
                                <p >
                                    {item.userLastName + " " + Array.from(item.userFirstName)[0]+"."} <span>said  
                                </span></p> 
                            </div>
                            
                            <div className="reviewRatingSection_title">
                                {item.reviewTitle}
                            </div>

                            <div className="reviewRatingSection_text">
                                {item.reviewText}    
                            </div>

                            <div className="stars">
                                <RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill />
                            </div>
                            <button className="reviewDeleteButton" onClick={deleteHandler}>Delete</button>
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
                    <input id="text" type="text" onChange={titleChange} required></input>
                    <span>Title</span>
                </div>
                
                <div className="reviewInputBoxes">
                    <input id="text" type="text" onChange={textChange} required></input>
                    <span>Text</span>
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