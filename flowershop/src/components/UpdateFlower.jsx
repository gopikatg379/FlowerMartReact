import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/css/Add.css'

const UpdateFlower = () => {
    const {id}=useParams()
    const navigate = useNavigate()
    const [data,setData] = useState({})
    const fetchData = async()=>{
        try{
            const token = localStorage.getItem("access_token");
            const response = await axios.get(`http://localhost:8080/flowerShop/get/one/${id}`,{
                headers: {
                     Authorization: `Bearer ${token}`,
                }
            })
            setData(response.data)
        }catch(error){
            console.log("There was an error",error)
        }
    }
    const InputData = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        let files = e.target.files;
        let newData;
        if(files){
            newData = {...data,[name]:files[0]}
            setData(newData)
        }else{
            newData = {...data,[name]:value}
            setData(newData)
        }
    }
    const replaceData = async()=>{
        try{
            const token = localStorage.getItem("access_token");
            const response = await axios.put(`http://localhost:8080/flowerShop/update/${id}`,data,{
                headers: {
                     Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            navigate('/home')
        }catch(error){
            console.log("There was an error",error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
    const submitData = ()=>{
        replaceData()
    }
  return (
    <>
    <div className="container2 mt-5 mb-4">
      <h2 className="mb-4">Add a New Flower</h2>
      <form >
        <div className="form-group1">
          <label htmlFor="flower_name">Flower Name:</label>
          <input
            type="text"
            className="form-control"
            id="flower_name"
            name="flower_name"
            value={data.flower_name}
            onChange={InputData}

            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={data.price}
            onChange={InputData}
          
 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            className="form-control"
            id="color"
            name="color"
            value={data.color}
            onChange={InputData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={data.description}
            onChange={InputData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={InputData}
            required
          />
        </div>
        <button type="button" onClick={submitData}  className="btn btn-primary">Submit</button>
      </form>
    </div>
    </>
  )
}

export default UpdateFlower
