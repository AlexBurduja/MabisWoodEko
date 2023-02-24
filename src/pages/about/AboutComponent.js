import React, { useContext } from 'react'

import './AboutPage.css'

import  photo1  from '../../publicResources/imagineBricheti1.jpeg'
import  photo2  from '../../publicResources/imagineBricheti2.jpeg'
import  photo3  from '../../publicResources/imagineBricheti3.jpeg'

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { AiOutlineArrowLeft } from 'react-icons/ai'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'

import { useEffect } from 'react'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase-config'

import  ConvertApi  from 'convertapi-js'
import { useState } from 'react'
import Loading from '../reusableComponents/Loading'
import { FirebaseAuthContext } from '../../FirebaseAuthContext'

export function AboutComponent (){

    const { conditional } = useContext(FirebaseAuthContext)

    const [firebaseImg , setFirebaseImg] = useState(null)
    const [url, setUrl] = useState(null)
    const [imgUrl, setImgUrl] = useState(null);

    const [imagess, setImages] = useState({})
    const [loading , setLoading] = useState(true)
    const [country, setCountry] = useState('England')

    useEffect(() => {
        const getProducts = async () => {
          const ref = collection(db, "aboutImages")
          const data = await getDocs(ref)
  
            setImages(data.docs.map((doc) => ({...doc.data(), id: doc.id})))

            setLoading(false)
            
        }
      
        getProducts();

      }, [country])

    const handleImageChange = (e) => {
        if (e.target.files[0]){
          setFirebaseImg(e.target.files[0])
          setImgUrl(URL.createObjectURL(e.target.files[0]))
        }
      }

    const handleSubmit = async () => {
        let convertApi = ConvertApi.auth('Af27QSYWI7JGHdxc')
        // let convertApi = ConvertApi.auth('Af27QSYWI7JGHdxc')
        let params = convertApi.createParams()
        params.add('file', firebaseImg);
        let result = await convertApi.convert('jpg', 'webp', params)
      
        const convertedImage = result.files[0].Url;
      
        const imageRef = ref(storage, `aboutImages/${firebaseImg.name.split('.')[0]}`);
      
        fetch(convertedImage)
          .then(res => res.arrayBuffer())
          .then(arrayBuffer => {
            uploadBytes(imageRef, arrayBuffer, {
              contentType: 'image/webp'
            })
            .then(() => {
              getDownloadURL(imageRef)
              .then((url) => {
                setUrl(url);
                try {
                  setDoc(doc(db, `aboutImages/${firebaseImg.name.split('.')[0]}`), {
                    url: url
                  });
                } catch (e) {
                  console.log(e);
                }
              })
              .catch((error) => {
                console.log(error.message, "Error uploading");
              });
              setFirebaseImg(null);
            })
            .catch((error) => {
              console.log(error.message);
            });
          });
      };
    
    const images = [
        { src: photo1 , alt: "Image 1" },
        { src: photo2 , alt: "Image 2" },
        { src: photo3 , width: '300px', height: '300px', alt: "Image 3" },
      ];


    const settings = {
        dots: true,
        infinite: true,
        autoplay : true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
      };

        function CustomPrevArrow(props) {
          const { onClick } = props;
          return (
            <button onClick={onClick} className="arrow prev">
              <AiOutlineArrowLeft />
            </button>
          );
        }
      
        function CustomNextArrow(props) {
          const { onClick } = props;
          return (
            <button onClick={onClick} className="arrow next">
              <AiOutlineArrowRight />
            </button>
          );
        }

        function handleDeleteImage(image) {
            const storageRef = ref(storage, image.url);
            deleteObject(storageRef)

            deleteDoc(doc(db, `aboutImages/${image.id}`))
            
            console.log('jobs done')
          }


    

    return (
    <section className='aboutSection'>
    <h1>{localStorage.getItem('language') === 'Romania' ? "Povestea Noastra" : "Our Story" }</h1>

    <div className='aboutWrapper'>
        <div className='aboutWrapperWrapper'>
            <div>
                <img className='photo1' src={photo1} alt='poza' width='300px' height='300px' />
            </div>
            
            <div>
                {localStorage.getItem('language') === 'Romania' ? <p>Avand <strong>15 ani</strong> de experienta in producția de mobilier din lemn si <strong>70</strong> de <strong>colegi dedicati</strong>, ne-am concentrat asupra unei noi afaceri - productia de <strong>peleti</strong> si <strong>brichete</strong>. In timpul unei vacante in Grecia, am intalnit o persoana care ne-a inspirat sa aducem în Romania o masina care transforma <strong>crengile uscate în rumegus de lemn</strong>. Dupa cercetari, am descoperit ca acest rumegus poate fi transformat în <strong>peleti</strong> și <strong>brichete</strong>, produse care sunt foarte cautate pe piata.</p> : <p>With <strong>15 years</strong> of experience in manufacturing wooden furniture and <strong>70 dedicated colleagues</strong>, we shifted our focus to a new business venture - the production of <strong>pellets</strong> and <strong>briquettes</strong>. During a vacation in Greece, we met someone who inspired us to bring a machine that transforms <strong>dry branches into wood chips</strong> to Romania. After research, we discovered that these wood chips can be transformed into <strong>pellets and briquettes</strong>, products that are in high demand on the market.</p>} 
            </div>
        </div>

        <div className='aboutWrapperWrapperSecond'>
            <div>
                <img className='photo2' src={photo2} alt='poza' width='300px' height='300px' />
            </div>
            
            <div>
                {localStorage.getItem('language') === 'Romania' ? 
                <p>Cu un teren și un depozit în orașul <strong>Bogati</strong> din <strong>Arges</strong>, am inceput productia cu ajutorul unei echipe de <strong>6</strong> persoane <strong>dedicate</strong> si utilaje <strong>profesionale</strong>. <strong>Prefectionismul</strong> nostru ne-a condus sa testam produsele și sa gasim formula <strong>perfecta</strong> pentru a oferi <strong>confort</strong> si <strong>satisfactie</strong> clientilor nostri. Acum, ne propunem sa aducem acest confort în casele dvs. prin intermediul <strong>peletilor</strong> nostri de inalta calitate.</p>
                
                : 
                
                <p>With a plot of land and a warehouse in the town of <strong>Bogati</strong> in <strong>Arges</strong>, we started production with the help of a team of <strong>6</strong> dedicated individuals and professional machinery. Our <strong>perfectionism</strong> led us to test the products and find the perfect formula to offer <strong>comfort</strong> and <strong>satisfaction</strong> to our customers. Now, we aim to bring this <strong>comfort</strong> to your homes through our high-quality <strong>pellets</strong>.</p>}
            </div>
        </div>

        <div className='aboutWrapperWrapper'>
            <div>
                <img className='photo3' src={photo3} alt='poza' width='300px' height='300px' />
            </div>
            
            <div>
                {localStorage.getItem('language') === "Romania" ? 
                <p>Suntem mandrii sa spunem ca suntem dedicati furnizarii de <strong>produse de calitate superioara</strong> și de <strong>servicii exceptionale</strong> clientilor nostri. Ne concentram intotdeauna pe imbunatatirea <strong>proceselor de productie</strong> si utilizam <strong>tehnologii avansate</strong> pentru a ne asigura ca <strong>peletii</strong> si <strong>brichetele</strong> noastre sunt produse cu <strong>precizie si eficienta</strong>. Suntem, de asemenea, preocupati de impactul pe care il avem asupra mediului inconjurator. Folosim materii prime de <strong>inalta calitate</strong> si <strong>resurse regenerabile</strong> pentru a produce <strong>peletii</strong> si <strong>brichetele</strong> noastre, iar, obiectivul nostru este de a reduce <strong>emisiile de carbon</strong> prin utilizarea de metode <strong>sustenabile si eficiente din punct de vedere energetic</strong></p>

                :

                <p>We are proud to say that we are committed to providing <strong>superior quality products</strong> and <strong>exceptional service</strong> to our customers. We always focus on improving our <strong>production processes</strong> and using <strong>advanced technologies</strong> to ensure that our <strong>pellets</strong> and <strong>briquettes</strong> are produced with <strong>precision and efficiency</strong>. We are also concerned about the impact we have on the environment. We use high-quality raw materials and <strong>renewable resources</strong> to produce our <strong>pellets</strong> and <strong>briquettes</strong>, and we are dedicated to reducing <strong>carbon emissions</strong> by using <strong>sustainable and energy-efficient methods</strong>.</p>
            }
            </div>
        </div>

    </div>


    {conditional.admin  && (
        <div>
            <div className='imageSection'>
                <input type="file" onChange={handleImageChange}></input>
                {imgUrl && <img src={imgUrl} alt="preview" width="350px" />}
                {firebaseImg && <button onClick={handleSubmit}>Select Image</button>}
            </div>
        </div>
    )}

    <div className='carouselMainDiv'>

        <h2>Photos</h2>

{loading ? <Loading /> : 
        <Slider className='sliderElement' {...settings}>
        
            {imagess.map((image) => (
                
            <div key={image.id} className='carouselDiv'>
                <img src={image.url} alt={image.alt} />
                <p onClick={() => handleDeleteImage(image)}><TiDelete /></p>
            </div>
            
            ))}
        </Slider>
}

    </div>
    
  </section>
  )
}
