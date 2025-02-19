import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddWishlist = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const hasFetched = useRef(false); 
    const fetchData = async()=>{
        if (hasFetched.current) return;
        hasFetched.current = true;
        try{
            const token = localStorage.getItem('access_token')
            const response = await axios.post(`http://localhost:8080/wishlist/add`,{},{
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    flowerId: id, 
                },
            })
            navigate('/home')
        }catch(error){
            console.log("There was an error",error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>
      
    </div>
  )
}

export default AddWishlist
