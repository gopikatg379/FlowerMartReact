import React, { useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import '../assets/css/Order.css'
const Order = () => {
    const location = useLocation();
    const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('access_token');
        const orderData = {
            address,
            phone,
            items: cartItems.flatMap(cart => cart.cartItems.map(item => ({
              flowerId: item.flower.flower_id,
              quantity: item.quantity
            }))),
            totalPrice: totalAmount
          };
          console.log(orderData)
          try {
            await axios.post("http://localhost:8080/order/add", orderData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      
            alert("Order placed successfully!");
            navigate("/home");
          } catch (error) {
            console.error("Error placing order", error);
            alert("Failed to place order");
          }
    }
  return (
    <div >
    <Navbar />
    <div className="shipping-container">
        <h2 className="shipping-title">Enter Shipping Details</h2>
        <form className="shipping-form" onSubmit={handleSubmit}>
            <label className="shipping-label">Address:</label>
            <input className="shipping-input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />

            <label className="shipping-label">Phone:</label>
            <input className="shipping-input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

            <h3 className="shipping-total">Total: ₹{totalAmount.toFixed(2)}</h3>
            <button className="shipping-button" type="submit">Place Order</button>
        </form>
    </div>
    <Footer />
</div>
  )
}

export default Order
