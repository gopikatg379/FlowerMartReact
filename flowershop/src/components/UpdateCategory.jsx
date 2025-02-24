import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateCategory = () => {
    const{id}=useParams();
    const navigate = useNavigate()
    const [data,setData] = useState({})
    const fetchData = async()=>{
        try{
            const token = localStorage.getItem('access_token')
            const response = await axios.get(`http://localhost:8080/category/get/one/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setData(response.data)
        }catch(error){
            console.log("There was an error",error)
        }
    }
    const InputData=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        let newData = {...data,[name]:value}
        setData(newData)
    }
    const replaceData = async()=>{
        try{
            const token = localStorage.getItem('access_token')
            const resposne = await axios.put(`http://localhost:8080/category/update/${id}`,data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
           navigate('/admin/profile/view/category') 
        }catch(error){
            console.log("There was an error",error)
        }
    }
    const submitData=()=>{
        replaceData()
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>
    <h2>Add Category</h2>
    <form>
      <label>Category Name:</label>
      <input
        type="text"
        name="categoryName"
        value={data.categoryName}
        onChange={InputData}
        required
      />
      <label>Description:</label>
      <input
        type="text"
        name="description"
        value={data.description}
        onChange={InputData}
        required
      />
      <button type="button" onClick={submitData}>Submit</button>
    </form>
  </div>
  )
}

export default UpdateCategory
