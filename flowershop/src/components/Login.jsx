import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../assets/css/Login.css'
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const[data,setData] = useState({
        "email":"",
        "password":""
    })
    const InputData = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        console.log(name)
        console.log(value)
        let newData = {...data,[name]:value}
        setData(newData)
    }
    const fetchData = async()=>{
        try{
            const params = new URLSearchParams();
            params.append('email', data.email);
            params.append('password', data.password);

            const response = await axios.post("http://localhost:8080/user/login",params,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
        })
            console.log(response.data)
            localStorage.setItem('access_token', response.data);
            navigate('/home')
        }catch(error){
            console.log("There was an error",error)
        }
    }
    const submitData=()=>{
        fetchData()
    }
  return (
    <div className='div1'>
    <div className="container1 mt-5">
      <h2 className="mb-4">Login</h2>
      <form  >
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={data.email}
            onChange={InputData}
          
 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={data.password}
            onChange={InputData}
            required
          />
        </div>
        <button type="button" onClick={submitData}  className="btn btn-primary">Submit</button>
        <p>Don't you have an account?<Link to='/register'>Register here</Link></p>
      </form>
    </div>
    </div>
  )
}

export default Login
