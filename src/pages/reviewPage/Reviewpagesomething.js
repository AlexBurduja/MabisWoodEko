import { collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore"
import { motion, AnimatePresence } from "framer-motion"
import React, { useContext } from "react"
import { useEffect, useState } from "react"
import { db } from "../../firebase-config"
import { FirebaseAuthContext } from "../../FirebaseAuthContext"
import { ReviewPageComponent } from "./ReviewPageComponent"


export function Reviewpagesomething(){

    const { user } = useContext(FirebaseAuthContext)

    const [review, setReview] = useState([])

    const [ loading, setLoading ] = useState(false)

    const [ succes, setSucces ] = useState('')

    const [conditional, setConditional] = useState([])

    const now = new Date();
    let minutes = now.getMinutes()

    minutes = minutes.toString().padStart(2, '0')

    useEffect(()=>{
        
        const getReviews = async () => {
            setLoading(true)
            const ref = collection(db, 'reviews')

            const data = await getDocs(ref)

            setReview(data.docs.map((doc) => ({...doc.data(), id:doc.id})))

            setLoading(false)
        };
        getReviews();
    
            const getDocument = async () => {
              const ref = doc(db, 'users', user.uid)
              
              const document = await getDoc(ref)
              
              setConditional(document.data())
            }
            getDocument()

    }, [user?.uid])

    // const { auth } = useContext(LoginContext)
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const options = ["1","2","3","4","5"];
    const [selected, setSelected] = useState(options[0]);
    
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
    reviewStar: selected,
    firstName: conditional.firstName,
    lastName: conditional.lastName,
    time : `${now.getDate()}.${now.getUTCMonth() + 1}.${now.getFullYear()} ${now.getHours()}:${minutes}` ,
    user: user.uid
}

const ref = doc(db, `reviews/${user.uid}`)

setDoc(ref, body)
}

console.log(conditional.firstName)


    return (
<>
        <section className="mainSection">
        
        {user?.uid ? 
        
            <>
        <div className="header">
            <h1>Review Page</h1>
            <h4>Here you can see how everyone reviewed our services!</h4>
            <h4>Be sure to leave one yourself by completing the form below!</h4>

            <AnimatePresence>
                {succes && (
                <motion.h5
                initial={{opacity: 0}}
                animate={{opacity:1}}
                exit={{opcaity: 0}}
                transition={{ease: "easeIn", duration:1}}
                className="reviewSuccesMessage"
                >
                    {succes}
                </motion.h5>
                )}
            </AnimatePresence>
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
                </section>
                </>
            : 
            <div className="notLoggedIn">

            <p>You have to <a href="/login">login</a> / <a href="/register">register</a>  to leave a review.</p>
            
            </div>}
        </section>

        <div className="reviewGrid">
        {review.map((reviews) => {
            return (
                <ReviewPageComponent
                reviewTitle = {reviews.reviewTitle}
                reviewText = {reviews.reviewText}
                rating = {reviews.reviewStar}
                firstName = {reviews?.firstName}
                lastName = {reviews.lastName}
                time = {reviews.time}
                id = {reviews.id}
                key = {reviews.id}>
                </ReviewPageComponent>
            )
        })}
        </div>
</>
    )
}