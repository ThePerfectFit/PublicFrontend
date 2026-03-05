import React, { useState, useEffect } from 'react';
import '../styles/homepage.css';
import VictoriaSecret from '../assets/DemoPhotos/VictoriaSecret.jpg';
import Uniqlo from '../assets/DemoPhotos/Uniqlo.jpg';
import Triumph from '../assets/DemoPhotos/Triumph.jpg';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/button';

function CurrentResults() {
  const [matchingRows, setMatchingRows] = useState([]);
  const [recBandSize, setRecBandSize] = useState(null);
  const [recCupSize, setRecCupSize] = useState(null);
  const [currentBandSize, setCurrentBandSize] = useState(null);
  const [currentCupSize, setCurrentCupSize] = useState(null);
  const [measuredBandSize, setMeasuredBandSize] = useState(null);
  const [measuredCupSize, setMeasuredCupSize] = useState(null);
  const navigate = useNavigate();

  const handleForwardClick = async () => {
    try {
      const response = await fetch('https://the-perfect-fit-backend.onrender.com/getMySQLData');
      if (response.ok) {
        const result = await response.json();
        console.log('Data received:', result);

        setRecBandSize(result.bandSize ?? null);
        setRecCupSize(result.cupSize ?? null);
        setCurrentBandSize(result.currentBandSize ?? null);
        setCurrentCupSize(result.currentCupSize ?? null);
        setMeasuredBandSize(result.measuredBandSize ?? null);
        setMeasuredCupSize(result.measuredCupSize ?? null);
        setMatchingRows(result.data ?? []);
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

  const handleButtonClick = () => navigate(-1);
  const handleRestart = () => navigate('/home');

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

  // Function to calculate bra size from band and bust measurements
  const calculateBraSize = (bandInches, bustInches) => {
    if (!bandInches || !bustInches) return '—';
    
    const band = parseInt(bandInches);
    const bust = parseInt(bustInches);
    const difference = bust - band;
    
    // Cup size mapping based on the difference
    let cupSize;
    if (difference === 0) cupSize = 'AA';
    else if (difference === 1) cupSize = 'A';
    else if (difference === 2) cupSize = 'B';
    else if (difference === 3) cupSize = 'C';
    else if (difference === 4) cupSize = 'D';
    else if (difference === 5) cupSize = 'DD (E)';
    else if (difference === 6) cupSize = 'DDD (F)';
    else if (difference === 7) cupSize = 'G';
    else if (difference === 8) cupSize = 'H';
    else if (difference === 9) cupSize = 'I';
    else if (difference === 10) cupSize = 'J';
    else if (difference < 0) cupSize = 'AA'; // If bust is smaller than band
    else cupSize = 'J+'; // If difference is greater than 10
    
    return `${band}${cupSize}`;
  };

  // Calculate the bra size from measurements
  const calculatedBraSize = calculateBraSize(measuredBandSize, measuredCupSize);

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

        {/* Controls */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', margin: '24px 0 32px' }}>
          <CustomButton label="Previous Question" onClick={handleButtonClick} />
          <CustomButton label="Restart Quiz" onClick={handleRestart} />
        </div>

        {/* Current and Recommended sizes */}
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto 28px',
            padding: '16px 18px',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: 12,
            textAlign: 'center',
          }}
        >
          <p className="bold-small-text" style={{ margin: 0 }}>Size 1</p> {/*Current Size */}
          <p style={{ margin: '6px 0 12px' }}>
            Band: {currentBandSize ?? '—'} · Cup: {currentCupSize ?? '—'}
          </p>

          <p className="bold-small-text" style={{ margin: 0 }}>Size 2</p> {/*Measured Size */}
          <p style={{ margin: '6px 0 0' }}>
            {/*Raw measurements - Band: {measuredBandSize} inches, Bust: {measuredCupSize} inches */}
            Band: {calculatedBraSize ? calculatedBraSize.replace(/[A-Z+()]/g, '') : '—'} · Cup: {calculatedBraSize ? calculatedBraSize.replace(/[0-9]/g, '') : '—'}
          </p>

          <p className="bold-small-text" style={{ margin: 0 }}>Size 3</p> {/*Recommended Size */}
          <p style={{ margin: '6px 0 0' }}>
            Band: {recBandSize ?? '—'} · Cup: {recCupSize ?? '—'}
          </p>
        </div>

        {/* Recommendations list */}
        <div className="measurement-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
          {matchingRows.map((row, index) => (
            <div className="measurement-column" key={index}>
              <p>{row.product_title}</p>
              <img
                src={row.image_url || getImageForBrand(row.Retailer)}
                alt={row.product_title}
                style={imageStyle}
              />
              <a href={row.product_page_url} target="_blank" rel="noopener noreferrer">View Product</a>
              <p className="bold-shape-text-bold">Band Sizes: {row.band_sizes}</p>
              <p className="bold-shape-text-bold">Cup Sizes: {row.cup_sizes}</p>
              <p>Price: SGD {row.price}</p>
            </div>
          ))}
          {matchingRows.length === 0 && (
            <p style={{ marginTop: 8, opacity: 0.8 }}>
              No products matched the recommended size yet. Try adjusting your answers or broaden the size range.
            </p>
          )}
        </div>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}

export default CurrentResults;
