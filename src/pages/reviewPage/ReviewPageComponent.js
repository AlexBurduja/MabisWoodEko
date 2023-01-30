import React, { useEffect, useState } from "react"
import { RiStarFill, RiStarLine } from "react-icons/ri";
import "./ReviewPageComponent.css"
import { AiOutlineClose } from "react-icons/ai";
import Slider from "react-slick";


export function ReviewPageComponent(props) {

    const { reviewTitle, reviewText, rating, firstName, lastName, time, id  } = props

    // const { auth } = useContext(LoginContext)


function deleteHandler() {
     fetch(`http://localhost:3001/reviews/${id}`,{
            
                 method: "DELETE"
             })
        window.location.reload();
}

function renderStars(rating) {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<RiStarFill />);
    }
    for (let i = 0; i < 5 - rating; i++) {
      stars.push(<RiStarLine />);
    }
    return stars;
  }

    
    return(
        <>
              <section className="reviewRatingSection">
        <div className="reviewRatingSection_username">
          <p>
            {lastName + " " + firstName?.substring(0,1) + ". "} <span>said</span>
          </p> 
        </div>
        
        <div className="reviewRatingSection_title">
          {reviewTitle}
        </div>
  
        <div className="reviewRatingSection_text">
          {reviewText}    
        </div>
  
        <div className="reviewRatingSection_stars">
          {renderStars(rating)}
        </div>
  
        <div className="reviewRatingSection_time">
          <p> Submitted at: {time}</p>
        </div>
  
        <button className="reviewDeleteButton" onClick={deleteHandler}>
          <AiOutlineClose />
        </button>
      </section>
        </>
    )
}