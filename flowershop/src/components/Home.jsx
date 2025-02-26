import React, { useEffect, useState,useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../assets/css/Home.css'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { Alert,Carousel  } from 'react-bootstrap'; 
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AllCategories from './AllCategories';

const Home = () => {
    const [data,setData] = useState([])
    const[error,setError]=useState(null)
    const scrollRef = useRef(null);
    const fetchData = async()=>{
        try{
            const token = localStorage.getItem("access_token");
            if(!token){
              setError('no access found')
              return;
            }
            const response = await axios.get("http://localhost:8080/flowerShop/get/flowers",{
              headers: {
                Authorization: `Bearer ${token}`
            }
            })
            console.log("Fetched data:", response.data);
            setData(response.data)
            
        }catch(error){
            console.log("There was an error",error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
    const scrollLeft = () => {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  // Scroll right function
  const scrollRight = () => {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const carouselImages = [
    { src: "/src/assets/images/flower1.jpg", alt: "Flower 1" },
    { src: "/src/assets/images/flower4.jpg", alt: "Flower 2" },
    { src: "/src/assets/images/flower3.jpg", alt: "Flower 3" }
];
  return (
    <>
    <Navbar/>
    <Carousel className="custom-carousel">
        {carouselImages.map((image, index) => (
          <Carousel.Item key={index}>
              <img className="d-block w-100" src={image.src} alt={image.alt} />
          </Carousel.Item>
          ))}
        </Carousel>
    <div className="scroll-container">
                <button className="scroll-btn left" onClick={scrollLeft}>
                    <FaChevronLeft />
                </button>
    <div className="card1-container"  ref={scrollRef}>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {data.map((x) => (
      <div className="card1" key={x.flower_id}>
        <img
          className="card1-img"
          src={`http://localhost:8080/uploads/${x.image}`}
          alt={x.flower_name}
        />
        <div className="card1-body">
          <h5 className="card1-title">{x.flower_name}</h5>
          <h6 className="card1-subtitle">{x.color}</h6>
          <p className="card1-text">{x.price}/KG</p>
          <Link to={`/view/${x.flower_id}`}><button className="btn1-login">View More</button></Link>
        </div>
    </div>
  ))}  
</div>
      <button className="scroll-btn right" onClick={scrollRight}>
                    <FaChevronRight />
                </button>
</div>
<div>
  <AllCategories/>
</div>
<Footer/>
</>
  )
}

export default Home
