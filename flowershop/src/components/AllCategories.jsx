import React ,{ useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const AllCategories = () => {
    const[category,setCategory]=useState([])
    const fetchCategory = async()=>{
          try{
            const token = localStorage.getItem('access_token')
            const response = await axios.get("http://localhost:8080/category/get",{
              headers:{
                Authorization:`Bearer ${token}`
              }
            })
            setCategory(response.data)
          }catch(error){
            console.log("There was an error",error)
          }
        }
    useEffect(()=>{
        fetchCategory()
    },[])
  return (
    <div>
      <h1 className="text-center my-4">Search By Category</h1>
      <div className="category-container3">
        {category.map((x, index) => (
          <Card key={index} className="category-card" style={{height:'300px'}}>
            <Card.Body>
              <Card.Title>{x.categoryName}</Card.Title>
              <Card.Text>{x.description}</Card.Text>
              <Link to={`/view/category/${x.categoryId}`}><Button variant="primary">See More</Button></Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AllCategories
