import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import '../assets/css/ViewMore.css'
import Footer from './Footer'
import { Link } from 'react-router-dom'
const ViewMore = () => {
    const {id} = useParams()
    const [data,setData] = useState({})
    const[user,setUser]=useState({})
    const navigate = useNavigate()
    const fetchData = async()=>{
        try{
            const token = localStorage.getItem("access_token");
            const response = await axios.get(`http://localhost:8080/flowerShop/get/one/${id}`,{
              headers: {
                Authorization: `Bearer ${token}`
            }
            })
            console.log(response.data)
            setData(response.data)
        }catch(error){
            console.log("There was an error",error)
        }
    }
    const fetchUser = async()=>{
      try{
          const token = localStorage.getItem("access_token");
          const response = await axios.get("http://localhost:8080/user/profile",{
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          })
          console.log(response.data)
          setUser(response.data)
          
      }catch(error){
          console.log("There was an error",error)
      }
  }
  const handleDelete=async()=>{
    try{
      const token = localStorage.getItem('access_token')
      const response = await axios.delete(`http://localhost:8080/flowerShop/delete/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      navigate('/home')
    }catch(error){
      console.log("There was an error",error)
    }
  }
    useEffect(()=>{
        fetchData(),
        fetchUser()
    },[])
  return (
    <>
    <Navbar></Navbar>
   
 <div className="card-container">   
      
    <div className="card" key={data.book_id} style={{ height: '500px', width: '350px' }}>
      <img
        className="card-img"
        src={`http://localhost:8080/uploads/${data.image}`}
        alt={data.flower_name}
        
      />
      <div className="card-body">
        <h5 className="card-title">{data.flower_name}</h5>
        <h6 className="card-subtitle">{data.color}</h6>
        <h6 className="card-subtitle">{data.description}</h6>
        <p className="card-text">{data.price}/-</p>
        <div className="icon-container">
        {user.role === 'USER'?(
          <div>
            <Link to={`/cart/${data.flower_id}`} className="icon-link">
              <i className="fas fa-shopping-cart" title="Add to Cart"></i>
            </Link>
            <Link to={`/wishlist/${data.flower_id}`} className="icon-link"> 
              <i className="fas fa-heart wishlist-icon" title="Add to Wishlist"></i>
            </Link>
          </div>
        ):(
          <div>
            <button className='delete-btn' onClick={handleDelete}>Delete</button>
            <Link to={`/update/${data.flower_id}`}><button className='update-btn'>Update</button></Link>
          </div>
        )}
      </div>
      </div>
    </div>
 </div>
<Footer></Footer>
</>
  )
}

export default ViewMore
