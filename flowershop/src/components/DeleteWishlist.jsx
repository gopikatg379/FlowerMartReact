import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteWishlist = () => {
    const {id}=useParams()
    const navigate = useNavigate()
    const fetchData = async()=>{
        try{
            const token = localStorage.getItem('access_token')
            const resposne = await axios.delete(`http://localhost:8080/wishlist/delete/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            navigate('/profile/view/wishlist')
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

export default DeleteWishlist
