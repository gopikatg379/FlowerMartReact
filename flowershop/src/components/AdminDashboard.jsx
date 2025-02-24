import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link,Outlet } from 'react-router-dom'
import Footer from './Footer'
import '../assets/css/AdminDashboard.css'
const AdminDashboard = () => {
    const [data,setData]=useState({})
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const fetchData = async()=>{
        try{
            const token = localStorage.getItem("access_token");
            const response = await axios.get("http://localhost:8080/user/profile",{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setData(response.data)
            
        }catch(error){
            console.log("There was an error",error)
        }
    }
    const toggleCategory = () => {
      setIsCategoryOpen(!isCategoryOpen);
    };
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>
      <Navbar></Navbar>
      <div className="profile-container">
        {/* Sidebar (Vertical Menubar) */}
        <div className="sidebar">
          <img
            className="profile-img"
            src={`http://localhost:8080/uploads/${data.image ? data.image : "default.jpg"}`}
            alt={data.name}
          />
          <span className="profile-name">{data.name ? data.name.toUpperCase() : "Loading..."}</span>
          <p className="profile-role">{data.role}</p>
          <ul className="menu">
            <li >
              <Link to='/admin/profile/dashboard' style={{textDecoration:'none'}}>Dashboard</Link></li>
            <li>
              <Link to='/admin/profile/add' style={{textDecoration:'none'}}>Add</Link>
            </li>
            <li>
              <Link to='/admin/profile/view/order' style={{textDecoration:'none'}}>View Orders</Link>
            </li>
            <li>
              <span onClick={toggleCategory} style={{ cursor: "pointer", fontWeight: "bold" }}>
                Category ▼
              </span>
              {isCategoryOpen && (
                <ul style={{ listStyle: "none", paddingLeft: "20px" }}>
                  <li><Link to="/admin/profile/add/category">Add Category</Link></li>
                  <li><Link to="/admin/profile/view/category">View Category</Link></li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          <h2>Welcome, {data.name ? data.name.toUpperCase() : "User"}!</h2>
          <Outlet />
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default AdminDashboard
