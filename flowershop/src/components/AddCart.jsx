import axios from 'axios'
import React, { useEffect, useState,useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddCart = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const hasFetched = useRef(false); 
    const fetchData = async()=>{
        if (hasFetched.current) return;
        hasFetched.current = true;
        try{
            const token = localStorage.getItem('access_token')
            if (!token) {
                console.error("No access token found! User might not be authenticated.");
                return;
            }
    
            console.log("Token Found:", token); 
            const response = await axios.post(`http://localhost:8080/cart/add`,{},{
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    flowerId: id, 
                },
            })
            navigate('/view/cart')
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

export default AddCart
