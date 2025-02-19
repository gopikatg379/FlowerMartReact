import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Table, Card, Button } from "react-bootstrap";
import '../assets/css/ViewOrder.css'
const ViewOrder = () => {
    const [data, setData] = useState([]);
    const [showOrder, setShowOrder] = useState(null); // Track which order to display

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('access_token')
            const response = await axios.get("http://localhost:8080/order/view", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            console.log("There was an error", error)
        }
    }
    const handleApprove = async(orderId)=>{
        try{
            const token = localStorage.getItem('access_token')
            const response = await axios.put(`http://localhost:8080/order/approve/${orderId}`,{},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            alert("Order approved successfully!");
            console.log("Order Approved:", response.data);
        }catch(error){
            console.log("There was an error",error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleToggleOrderDetails = (index) => {
        setShowOrder(showOrder === index ? null : index);
    }

    return (
        <>
            <div className="container mt-4">
            <h2 className="text-center">Orders</h2>
            {data.map((item, idx) => (
                <Card key={idx} className="mb-4 shadow-sm">
                    <Card.Body>
                        <div className="customer-info">
                            <Card.Title>{item.userName.toUpperCase()}</Card.Title>
                            <Card.Text>
                                <strong>Address:</strong> {item.address} <br />
                                <strong>Phone:</strong> {item.phone} <br />
                                <strong>Total Amount:</strong> ₹{item.items.reduce((total, flower) => total + flower.price * flower.quantity, 0).toFixed(2)}
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
                                
                            </Table>
                        )}
                        {item.status === "Pending" && (
                            <Button 
                                variant="success" 
                                className="mt-3"
                                onClick={() => handleApprove(item.orderId)} // Ensure `orderId` exists
                            >
                                Approve Order
                            </Button>
                        )}
                            
                    </Card.Body>
                </Card>
            ))}
            </div>
        
        </>
    )
}

export default ViewOrder;
