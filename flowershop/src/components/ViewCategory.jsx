import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';

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
      </tr>
    </thead>
    <tbody>
      {data.map((x, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{x.categoryName}</td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>

  )
}

export default ViewCategory
