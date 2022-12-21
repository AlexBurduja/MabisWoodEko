import { useContext, useEffect, useState } from "react"
import React from "react"
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { AuthContext } from "../../App";
import "./ReviewPageComponent.css"
import { useParams } from "react-router-dom";

export function ReviewPageComponent(props) {

    const { reviewTitle, reviewText, rating, firstName, lastName, id  } = props

    const [reviews, setReviews] = useState([])

    const { auth } = useContext(AuthContext)


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

    fetch(`http://localhost:3001/reviews`, {
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
     fetch(`http://localhost:3001/reviews/${id}`,{
            
                 method: "DELETE"
             })
}


function Hello(){
                    if (rating === "1") {
                        return (
                            <section className="reviewRatingSection">
                            <div className="reviewRatingSection_username">
                                <p>
                                    {lastName + " " + firstName?.substring(0,1) + ". "} <span>said  
                                </span></p> 
                            </div>
                            
                            <div className="reviewRatingSection_title">
                                {reviewTitle}
                            </div>

                            <div className="reviewRatingSection_text">
                                {reviewText}    
                            </div>

                            <div className="stars">
                            <RiStarFill /><RiStarLine /><RiStarLine /><RiStarLine /><RiStarLine />
                            </div>
                            {auth.user.admin &&
                                <button className="reviewDeleteButton" onClick={deleteHandler}>Delete</button>
                            }
                            </section>
                        )
                    }

                    if(rating === "2"){
                    return  (
                        <section className="reviewRatingSection">
                            <div className="reviewRatingSection_username">
                                <p >
                                    {lastName + " " + firstName?.substring(0,1) + ". " }<span>said  
                                </span></p> 
                            </div>
                            
                            <div className="reviewRatingSection_title">
                                {reviewTitle}
                            </div>

                            <div className="reviewRatingSection_text">
                                {reviewText}    
                            </div>

                        <div className="stars">
                            <RiStarFill /><RiStarFill /><RiStarLine /><RiStarLine /><RiStarLine />
                        </div>
                        {auth.user.admin &&
                                <button className="reviewDeleteButton" onClick={deleteHandler}>Delete</button>
                        }
                        </section>
                        )
                    }

                    if(rating === "3"){
                        return (
                            <section className="reviewRatingSection">
                            <div className="reviewRatingSection_username">
                                <p >
                                    {lastName + " " + firstName?.substring(0,1) + ". "} <span>said  
                                </span></p> 
                            </div>
                            
                            <div className="reviewRatingSection_title">
                                {reviewTitle}
                            </div>

                            <div className="reviewRatingSection_text">
                                {reviewText}    
                            </div>
                                
                            <div className="stars">
                                <RiStarFill /><RiStarFill /><RiStarFill /><RiStarLine /><RiStarLine />
                            </div>
                            {auth.user.admin &&
                                <button className="reviewDeleteButton" onClick={deleteHandler}>Delete</button>
                            }
                            </section>
                        )
                    }

                    if(rating === "4"){
                        return (
                            <section className="reviewRatingSection">
                            <div className="reviewRatingSection_username">
                                <p >
                                    {lastName + " " + firstName?.substring(0,1) + ". "} <span>said  
                                </span></p> 
                            </div>
                            
                            <div className="reviewRatingSection_title">
                                {reviewTitle}
                            </div>

                            <div className="reviewRatingSection_text">
                                {reviewText}    
                            </div>

                            <div className="stars">
                                <RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill /><RiStarLine />
                            </div>
                            {auth.user.admin &&
                                <button className="reviewDeleteButton" onClick={deleteHandler}>Delete</button>
                            }
                            </section>
                        )
                    }

                    if(rating === "5"){
                        return(
                            <section className="reviewRatingSection">
                            <div className="reviewRatingSection_username">
                                <p >
                                    { lastName + " " + firstName?.substring(0,1) + "."} <span>said  
                                </span></p> 
                            </div>
                            
                            <div className="reviewRatingSection_title">
                                {reviewTitle}
                            </div>

                            <div className="reviewRatingSection_text">
                                {reviewText}    
                            </div>

                            <div className="stars">
                                <RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill />
                            </div>
                            {auth.user.admin &&
                                <button className="reviewDeleteButton" onClick={deleteHandler}>Delete</button>
                            }
                            </section>
                        )
                    }
};

const options = ["1","2","3","4","5"]
const [selected, setSelected] = useState(options[0])

    return(
        <>
                <Hello />
        </>
    )
}