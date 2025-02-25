import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Card, Button } from "react-bootstrap";
import '../assets/css/MyOrders.css'
const MyOrders = () => {
    const [data,setData] = useState([])
    const [showOrder, setShowOrder] = useState(null);
    const fetchData=async()=>{
        try{
            const token = localStorage.getItem('access_token')
            const response = await axios.get('http://localhost:8080/order/view_order',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setData(response.data)
        }catch(error){
            console.log("There was an error",error)
        }
    }
    const handleCancel = async(orderId)=>{
        try{
            const token = localStorage.getItem('access_token')
            const response = await axios.delete(`http://localhost:8080/order/cancel_order/${orderId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            alert("Order cancelled successfully!");
            navigate('/admin/profile/view/order')
            console.log("Order Cancelled:", response.data);
        }catch(error){
            console.log("There was an error",error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
    const handleToggleOrderDetails = (index) => {
        setShowOrder(showOrder === index ? null : index);
    }
  return (
    <div className="container mt-4">
            <h2 className="text-center">Orders</h2>
            {data.map((item, idx) => (
                <Card key={idx} className="mb-4 shadow-sm">
                    <Card.Body>
                        <div className="customer-info">
                            <Card.Text>
                                <strong>Order ID:{item.orderId}</strong><br />
                                <strong>Address:</strong> {item.address} <br />
                                <strong>Phone:</strong> {item.phone} <br />
                                <strong>Total Amount:</strong> ₹{item.items.reduce((total, flower) => total + flower.price * flower.quantity, 0).toFixed(2)}<br/>
                                <strong
                                    style={{
                                        color: item.status === 'Approved' ? 'green' : item.status === 'Pending' ? 'black' : item.status === 'Rejected' ? 'red' : 'black'
                                    }}
                                    >
                                    Status: {item.status}
                                </strong>
                            </Card.Text>
                            
                            <Button variant="primary" onClick={() => handleToggleOrderDetails(idx)}>
                                {showOrder === idx ? 'Hide Order Details' : 'View Order'}
                            </Button>
                        </div>

                        {/* Display Order Details inside the card */}
                        {showOrder === idx && (
                            <Table striped bordered hover className="cart-table mt-3">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Flower</th>
                                        <th>Color</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.items.map((flower, flowerIdx) => (
                                        <tr key={flowerIdx}>
                                            <td>{flowerIdx + 1}</td>
                                            <td>{flower.flowerName}</td>
                                            <td>{flower.color}</td>
                                            <td>{flower.price}</td>
                                            <td>{flower.quantity}</td>
                                            <td>₹{(flower.price * flower.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                {item.status !== "Cancelled" && (
                                    <button className="cancel-btn" onClick={() => handleCancel(item.orderId)}>Cancel Order</button>
                                )}

                            </Table>
                        )}
                    </Card.Body>
                </Card>
            ))}
            </div>
  )
}

export default MyOrders
