import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/ViewWishlist.css'

const ViewWishlist = () => {
    const [data,setData] = useState([])
    const fetchData = async()=>{
        try{
            const token = localStorage.getItem('access_token')
            const response = await axios.get(`http://localhost:8080/wishlist/view`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            console.log(response.data)
            setData(response.data)
        }catch(error){
            console.log("There was an error",error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div className="wishlist-page">
    <div className="wishlist-header">
      <h1>My Wishlist</h1>
      <p>Your favorite flowers, all in one place!</p>
    </div>

    <div className="wishlist-container">
      {data.length > 0 ? (
        <div className="wishlist-grid">
          {data.map((flower) => (
            <div className="flower-card" key={flower.flowerId}>
              <img
                src={`http://localhost:8080/uploads/${flower.flower.image}`}
                alt={flower.flower.flower_name}
                className="flower-image"
              />
              <div className="flower-details">
                <h3>{flower.flower.flower_name}</h3>
                <p>Color: {flower.flower.color}</p>
                <p>Price: {flower.flower.price}/-</p>
              </div>
              <div className="flower-actions">
                <Link to={`/cart/${flower.flower.flower_id}`} className="icon-link">
                  <i className="fas fa-shopping-cart" title="Add to Cart"></i>
                </Link>
                <Link
                  className="remove-button"
                  to={`/delete/${flower.wishlistId}`}
                >
                  <i className="fas fa-trash" title="Remove from Wishlist"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-wishlist">Your wishlist is empty. Start adding your favorite flowers!</p>
      )}
    </div>
  </div>
  )
}

export default ViewWishlist
