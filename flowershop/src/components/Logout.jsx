import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:8080/user/logout", null, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                localStorage.removeItem('access_token'); // Remove the token
                navigate('/'); // Redirect to home page
            } catch (error) {
                console.log("There was an error", error);
            }
        };

        fetchData();
    }, [navigate]);

    return null; // No UI needed for logout
};

export default Logout;
