import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore"
import { motion, AnimatePresence } from "framer-motion"
import React, { useCallback, useContext } from "react"
import { useEffect, useState } from "react"
import { db } from "../../firebase-config"
import { FirebaseAuthContext } from "../../FirebaseAuthContext"
import { ReviewPageComponent } from "./ReviewPageComponent"
import './ReviewPageComponent.css'

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loading from "../reusableComponents/Loading"

import { AiOutlineArrowLeft } from 'react-icons/ai'
import { AiOutlineArrowRight } from 'react-icons/ai'


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

const postHandler = async (event) =>{
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


const ref = doc(db, `reviews/${title}`)

setDoc(ref, body)

}

const [slidesToShow, setSlidesToShow] = useState(1);

const CustomPrevArrow = React.memo((props) => {
  const { onClick } = props;
  return (
    <button onClick={onClick} className="arrow prev">
      <AiOutlineArrowLeft />
    </button>
  );
});

const CustomNextArrow = React.memo((props) => {
  const { onClick } = props;
  return (
    <button onClick={onClick} className="arrow next">
      <AiOutlineArrowRight />
    </button>
  );
});


const settings = {
  dots: true,
  infinite: true,
  // autoplay : true,
  autoplaySpeed: 3000,
  speed: 500,
  slidesToShow: slidesToShow,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  };

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setSlidesToShow(1);
      } else if (window.innerWidth > 1000) {
        setSlidesToShow(3)
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener('load', handleResize)
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener('load', handleResize)
    };
  }, [setSlidesToShow]);
  

  const groupedReviews = [ [], [], [], [], [] ]; // Initialize an array of arrays for each star rating
  
  review.forEach((review) => {
    const starRating = parseInt(review.reviewStar);
    groupedReviews[starRating - 1].push(review);
  });

  const countsByRating = review.reduce((counts, review) => {
    const rating = review.reviewStar;
    counts[rating] = (counts[rating] || 0) + 1;
    return counts;
  }, {});

    return (
<>
        <section className="mainSection">
        
        {user?.uid ? 
        
            <>
        <div className="header">
          {localStorage.getItem('language') === "Romania" ? 
          <>
              <h1>Pagina de revizuire</h1>
              <h4>Aici puteti vedea cum toata lumea a revizuit serviciile noastre!</h4>
              <h4>Lasati o revizuire completand formularul de mai jos!</h4>
          </>
          
          : 

          <>
            <h1>Review Page</h1>
            <h4>Here you can see how everyone reviewed our services!</h4>
            <h4>Be sure to leave one yourself by completing the form below!</h4>
          </>

          }

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
                    {localStorage.getItem("language") === 'Romania' ? <span>Titlu</span> : <span>Title</span> }
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

                    <button onClick={postHandler}>{localStorage.getItem('language') === 'Romania' ? 'Posteaza' : 'Post'}</button>
                </div>
                </section>
                </>
            : 
            <div className="notLoggedIn">

            <p>You have to <a href="/login">login</a> / <a href="/register">register</a>  to leave a review.</p>
            
            </div>}
        </section>

        
        {/* <div className="reviewGrid"> */}
        {loading ? (
  <Loading />
) : (
  groupedReviews
  .sort((a,b) => b[0]?.reviewStar - a[0]?.reviewStar)
  .map((reviews, index) => {
    return (
      <div key={index} className='lmao'>
        {reviews.length > 0 && reviews[0].reviewStar ? (
            localStorage.getItem('language') === 'Romania' ? <h2 className="reviewTitles">{`Recenzii de ${reviews[0].reviewStar} stele (${countsByRating[reviews[0].reviewStar]})`} </h2> : 
            
            <h2 className="reviewTitles">
            {`${reviews[0].reviewStar}-star Reviews (${countsByRating[reviews[0].reviewStar]})`}
              </h2>
            
            
        ) : (
          <p>No reviews available.</p>
        )}
        {reviews.length > 0 ? (
          <Slider {...settings} className='slider'>
            {reviews.map((review) => (
              <ReviewPageComponent
                reviewTitle={review.reviewTitle}
                reviewText={review.reviewText}
                rating={review.reviewStar}
                firstName={review?.firstName}
                lastName={review.lastName}
                time={review.time}
                id={review.id}
                key={review.id}
              />
            ))}
          </Slider>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    );
  })
)}
  {/* </div> */}
</>
    )
}