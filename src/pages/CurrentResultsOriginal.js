import React, { useState, useEffect } from 'react';
import '../styles/homepage.css';
import VictoriaSecret from '../assets/DemoPhotos/VictoriaSecret.jpg';
import Uniqlo from '../assets/DemoPhotos/Uniqlo.jpg';
import Triumph from '../assets/DemoPhotos/Triumph.jpg';

import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/button';

function CurrentResults() {
  const [matchingRows, setMatchingRows] = useState([]);
  const navigate = useNavigate(); 

  const handleForwardClick = async () => {
    try {
      const response = await fetch('https://the-perfect-fit-backend.onrender.com/getMySQLData');
      if (response.ok) {
        const result = await response.json();
        console.log('Data received:', result);
        setMatchingRows(result.data);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    handleForwardClick();
  }, []);

  const handleButtonClick = () => {
    navigate(-1);
  };

  const handleRestart = () => {
    navigate('/home');
  };

  const getImageForBrand = (brand) => {
    switch (brand) {
      case "Victoria's Secret":
        return VictoriaSecret;
      case 'Uniqlo':
        return Uniqlo;
      case 'Triumph':
        return Triumph;
      default:
        return;
    }
  };

  const imageStyle = {
    width: '300px',
    height: '300px',
    objectFit: 'cover',
  };

  return (
    <div className="home-page">
      <header className="header"></header>
      <main style={{ marginTop: '50px' }}>
        <p>Your current bra may not be the perfect fit for you...</p>
        <p className="bold-large-text" style={{ marginBottom: '15px' }}>
          Here are our other bra recommendations
        </p>
        <p style={{ marginBottom: '24px' }}>
          Bra sizes vary brand to brand. Our goal is to match you with the best bra for your measurements,
          regardless of what size the brand mentions. (Change copy later to a short disclaimer.)
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', margin: '24px 0 40px' }}>
          <CustomButton label="Previous Question" onClick={handleButtonClick} />
          <CustomButton label="Restart Quiz" onClick={handleRestart} />
        </div>

        <div className="measurement-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
          {matchingRows.map((row, index) => (
            <div className="measurement-column" key={index}>
              <p>{row.product_title}</p>
              <img
                src={row.image_url || getImageForBrand(row.Retailer)}
                alt={row.product_title}
                style={imageStyle}
              />
              <p></p>
              <a href={row.product_page_url} target="_blank" rel="noopener noreferrer">View Product</a>
              <p className="bold-shape-text-bold">Band Sizes: {row.band_sizes}</p>
              <p className="bold-shape-text-bold">Cup Sizes: {row.cup_sizes}</p>
              <p>Price: SGD {row.price}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}

export default CurrentResults;
