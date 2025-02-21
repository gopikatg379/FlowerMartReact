import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AddCategory = () => {
    const[data,setData]=useState({
        "categoryName":""
    })
    const navigate = useNavigate()
    const InputData=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        console.log(name)
        console.log(value)
        let newData = {...data,[name]:value}
        setData(newData)      
    }
    const fetchData=async()=>{
      try{
        const token = localStorage.getItem('access_token')
        const response = await axios.post("http://localhost:8080/category/add",data,{
          headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type": "application/json",
          }
        })
        navigate('/admin/profile/view/category')
      }catch(error){
        console.log("There was an error",error)
      }
    }
    const submitData=()=>{
      fetchData()
    }
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
        <button type="button" onClick={submitData}>Submit</button>
      </form>
    </div>
  )
}

export default AddCategory
