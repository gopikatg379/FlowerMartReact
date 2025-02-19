import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer';
import Table from 'react-bootstrap/Table';
import '../assets/css/ViewCart.css'
import { Link, useNavigate } from 'react-router-dom';

const ViewCart = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const fetchData =async()=>{
        try{
            const token = localStorage.getItem('access_token')
            const response = await axios.get("http://localhost:8080/cart/view",{
                headers: {
                    Authorization: `Bearer ${token}`
               }
            })
            console.log(response.data)
            setData(response.data)
        }catch(error){
            console.log("There was an error",error)
        }
    }
    const totalAmount = data.reduce((total, cart) => {
        return total + cart.cartItems.reduce((subTotal, item) => {
            return subTotal + item.flower.price * item.quantity;
        }, 0);
    }, 0);
    const handleOrder = () => {
        navigate('/order', { state: { cartItems: data, totalAmount } });
    };
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <>
    <Navbar></Navbar>
    <div className="container mt-4">
    <h2 className="text-center">Cart Items</h2>
        <Table striped bordered hover className="cart-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Flower</th>
            <th>Color</th>
            <th>Price</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {data.map((cart, index) => (
                cart.cartItems.map((item, idx) => (
                    <tr key={`${index}-${idx}`}>
                        <td>{idx + 1}</td>
                        <td>{item.flower.flower_name}</td>
                        <td>{item.flower.color}</td>
                        <td>{item.flower.price}</td>
                        <td><img
                            className="cart-img"
                            src={`http://localhost:8080/uploads/${item.flower.image}`}
                            alt={item.flower.flower_name}
                        /></td>
                        <td>{item.quantity}</td>
                        <td>₹{(item.flower.price*item.quantity).toFixed(2)}</td>
                        <td className='delete-icon'>
                            <Link to={`/delete/cart/${item.cartItemId}`}><i className="fas fa-trash"></i></Link>
                        </td>
                    </tr>
                ))
            ))}
        </tbody>
      </Table>
      <div className="total-amount">
            <h4>Total Amount: ₹{totalAmount.toFixed(2)}</h4>
            <button onClick={handleOrder} className='order-btn'>Order Now</button>
      </div>
    </div>
    <Footer></Footer>
    </>
  )
}

export default ViewCart
