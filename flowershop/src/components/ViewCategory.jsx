import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import '../assets/css/ViewCategory.css'
const ViewCategory = () => {
    const [data,setData] = useState([])
    const fetchData=async()=>{
        try{
            const token=localStorage.getItem('access_token')
            const response = await axios.get("http://localhost:8080/category/get",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setData(response.data)
        }catch(error){
            console.log("There was an error",error)
        }
    }
    const handleDelete=async(categoryId)=>{
        try{
          const token = localStorage.getItem('access_token')
          const response = await axios.delete(`http://localhost:8080/category/delete/${categoryId}`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          setData(data.filter(category => category.categoryId !== categoryId));
          
        }catch(error){
          console.log("There was an error",error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Category Name</th>
        <th>Description</th>
        <th>Delete</th>
        <th>Update</th>
      </tr>
    </thead>
    <tbody>
      {data.map((x, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{x.categoryName}</td>
          <td>{x.description}</td>
          <td><button className='btn2' onClick={()=>handleDelete(x.categoryId)}>Delete</button></td>
          <Link to={`/admin/profile/category/update/${x.categoryId}`}><button className='btn2'style={{marginTop:'10px',backgroundColor:'green'}}>Update</button></Link>
        </tr>
      ))}
    </tbody>
  </Table>
</div>

  )
}

export default ViewCategory
