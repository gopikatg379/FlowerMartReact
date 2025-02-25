import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import '../assets/css/OneCategory.css'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
const OneCategory = () => {
    const {id}=useParams()
    const [data,setData]=useState({})
    const[user,setUser]=useState({})
    const fetchData = async()=>{
        try{
            const token = localStorage.getItem('access_token')
            const response = await axios.get(`http://localhost:8080/category/get/one/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
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
    useEffect(()=>{
        fetchData(),
        fetchUser()
    },[])
  return (
    <div>
    <Navbar></Navbar>
    <div>
    {data && data.categoryName && (
        <h1 className="text-center my-4">{data.categoryName}</h1>
    )}
    <div className="category-container3">
      {data && data.flowers ? (
        data.flowers.map((flower, index) => (
          <Card key={index} className="category-card1">
            <Card.Img
              variant="top"
              src={`http://localhost:8080/uploads/${flower.image}`}
            />
            <Card.Body>
                
              <Card.Title>{flower.flowerName}</Card.Title>
              <Card.Text>Color: {flower.color}</Card.Text>
              <Card.Text>Price: {flower.price}/KG</Card.Text>
              {user.role === 'USER'?(
              <Link to={`/cart/${flower.flower_id}`}><button>Buy Now</button></Link>
            ):(
                <h1>null</h1>
            )}
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Loading...</p> 
      )}
    </div>
  </div>
  <Footer></Footer>
  </div>
  )
}

export default OneCategory
