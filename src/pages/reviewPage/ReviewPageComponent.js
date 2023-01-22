import { useContext } from "react"
import React from "react"
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { LoginContext } from "../../App";
import "./ReviewPageComponent.css"
import { AiOutlineClose } from "react-icons/ai";

export function ReviewPageComponent(props) {

    const { reviewTitle, reviewText, rating, firstName, lastName, time, id  } = props

    // const { auth } = useContext(LoginContext)


function deleteHandler() {
     fetch(`http://localhost:3001/reviews/${id}`,{
            
                 method: "DELETE"
             })
        window.location.reload();
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

                            <div className="reviewRatingSection_stars">
                            <RiStarFill /><RiStarLine /><RiStarLine /><RiStarLine /><RiStarLine />
                            </div>
                            
                            <div className="reviewRatingSection_time">
                                <p> Submitted at: {time}</p>
                            </div>
                            
                                <button className="reviewDeleteButton" onClick={deleteHandler}><AiOutlineClose /></button>
                            
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

                        <div className="reviewRatingSection_stars">
                            <RiStarFill /><RiStarFill /><RiStarLine /><RiStarLine /><RiStarLine />
                        </div>

                        <div className="reviewRatingSection_time">
                                <p> Submitted at: {time}</p>
                        </div>

                                <button className="reviewDeleteButton" onClick={deleteHandler}><AiOutlineClose /></button>
                        
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
                                
                            <div className="reviewRatingSection_stars">
                                <RiStarFill /><RiStarFill /><RiStarFill /><RiStarLine /><RiStarLine />
                            </div>

                            <div className="reviewRatingSection_time">
                                <p> Submitted at: {time}</p>
                            </div>

                                <button className="reviewDeleteButton" onClick={deleteHandler}><AiOutlineClose /></button>
                            
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

                            <div className="reviewRatingSection_stars">
                                <RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill /><RiStarLine />
                            </div>

                            <div className="reviewRatingSection_time">
                                <p> Submitted at: {time}</p>
                            </div>

                                <button className="reviewDeleteButton" onClick={deleteHandler}><AiOutlineClose /></button>
                            
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

                            <div className="reviewRatingSection_stars">
                                <RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill /><RiStarFill />
                            </div>

                            <div className="reviewRatingSection_time">
                                <p> Submitted at: {time}</p>
                            </div>

                                <button className="reviewDeleteButton" onClick={deleteHandler}><AiOutlineClose /></button>
                            
                            </section>
                        )
                    }
};

    return(
        <>
                <Hello />
        </>
    )
}