import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import '../assets/css/SearchResults.css'
const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div>
        <Navbar></Navbar>
        <div className="search-results-container">
  <h2>Search Results</h2>
  {results.length > 0 ? (
    <div className="search-results-grid">
      {results.map((flower) => (
        <div className="flower-card" key={flower.flowerId}>
          <img src={`http://localhost:8080/uploads/${flower.image}`} alt={flower.flower_name} />
          <h3>{flower.flower_name}</h3>
          <p>Color: {flower.color}</p>
          <p>Price: {flower.price}/-</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="no-results">No results found.</p>
  )}
        </div>
    </div>
  );
};

export default SearchResults;
