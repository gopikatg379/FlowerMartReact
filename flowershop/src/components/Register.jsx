import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const[data,setData] = useState({
        "name":"",
        "email":"",
        "password":"",
        "role":"USER",
        "image":null
    })
    const InputData = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        let files = e.target.files;
        console.log(name)
        console.log(value)
        console.log(files)
        let newData;
        if(files){
            newData = {...data,[name]:files[0]}
            setData(newData)
        }else{
            newData = {...data,[name]:value}
            setData(newData)
        }
        console.log(newData)
    }
    const fetchData = async()=>{
        try{
            const response = await axios.post("http://localhost:8080/user/register",data,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            navigate('/')
            
        }catch(error){
            console.log("There was an error",error)
        }
    }
    const submitData=()=>{
        fetchData()
    }
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Register</h2>
      <form  >
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={data.name}
            onChange={InputData}

            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="role">Role:</label>
            <select
                className="form-control"
                id="role"
                name="role"
                value={data.role}
                onChange={InputData}
                required
              >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
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
  )
}

export default Register
