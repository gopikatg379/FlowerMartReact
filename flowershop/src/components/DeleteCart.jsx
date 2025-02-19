import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteCart = () => {
    const {id}=useParams()
    const navigate = useNavigate()
    const handleDelete=async()=>{
        try{
            const token = localStorage.getItem('access_token')
            const response = await axios.delete(`http://localhost:8080/cart/delete/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            navigate('/view/cart')
        }catch(error){
            console.log("There was an error",error)
        }
    }
    useEffect(()=>{
        handleDelete()
    },[])
  return (
    <div>
      
    </div>
  )
}

export default DeleteCart
