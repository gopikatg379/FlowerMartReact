import React, { useState,useEffect } from "react";
import "../assets/css/Navbar.css"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const[searchQuery,setSearchQuery] = useState("");
  const [data,setData]=useState({})
  const navigate = useNavigate();
  const handleSearch = async(e)=>{
    e.preventDefault(); // Prevent form submission reloading the page
    if (!searchQuery.trim()) return; // Prevent empty search
    try{
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`http://localhost:8080/flowerShop/search?flower=${searchQuery}`,{
        headers: {
          Authorization: `Bearer ${token}`
      }
      })
      navigate(`/search?query=${searchQuery}`, { state: { results: response.data } });
    }catch(error){
      console.log("There was an error",error)
    }
  }
  const fetchData = async()=>{
    try{
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:8080/user/profile",{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        console.log(response.data)
        setData(response.data)
        
    }catch(error){
        console.log("There was an error",error)
    }
}
useEffect(()=>{
    fetchData()
},[])
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span style={{ color: "red" }}>Flower</span>
        <span style={{ color: "green" }}>Mart</span>
      </div>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <a href="#">Contact</a>
      </div>

      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search flowers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>

      <div className="icons">
      {data.role === 'USER'?(
        <Link to='/view/cart' style={{color:'black'}}><i className="fas fa-shopping-cart"></i></Link>
      ):(
        null
      )}
        {/* User Icon with Dropdown */}
        <div className="user-dropdown">
          <i className="fas fa-user" onClick={toggleDropdown}></i>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {data.role === 'ADMIN'?(
                  <Link to="/admin/profile">My Profile</Link>
              ): (
                <Link to="/profile">User Profile</Link>
              )}          
              <Link to="/logout">Logout</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
