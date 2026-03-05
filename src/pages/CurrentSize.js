import React, { useState, useEffect } from 'react';
import CustomButton from '../components/button';
import '../styles/homepage.css';
import SecondaryButton from '../components/newbutton';
import { useNavigate } from 'react-router-dom';

function CurrentSize() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const CUP_SIZES = {
    "Victoria's Secret": ['AA', 'A', 'B', 'C', 'D', 'DD (E)', 'DDD (F)', 'G', 'H', 'I', 'J'],
    Uniqlo: ['A', 'B', 'C', 'D', 'E', 'F'],
  };
  const [cupBrand, setCupBrand] = useState("Victoria's Secret");

  const [selectedBandSize, setSelectedBandSize] = useState('');
  const [selectedCupSize, setSelectedCupSize] = useState('');
  const [activeBand, setActiveBand] = useState('');
  const [activeCup, setActiveCup] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleCupSizeClick = (cupSize) => {
    setSelectedCupSize(cupSize);
    setActiveCup(cupSize);
    setShowWarning(false);
  };

  const handleBandSizeClick = (bandSize) => {
    setSelectedBandSize(bandSize);
    setActiveBand(bandSize);
    setShowWarning(false);
  };

  // switch VS vs Uniqlo cup sizes
  const handleToggleCupBrand = () => {
    const nextBrand = cupBrand === "Victoria's Secret" ? 'Uniqlo' : "Victoria's Secret";
    setCupBrand(nextBrand);
    setSelectedCupSize('');
    setActiveCup('');
  };

  const handleButtonClick = async () => {
    if (!selectedBandSize || !selectedCupSize) {
      setShowWarning(true);
      return;
    }

    const data = {
      bandSize: Number(selectedBandSize),
      cupSize: selectedCupSize,
    };

    try {
      const response = await fetch('https://the-perfect-fit-backend.onrender.com/sendSize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate('/measurements');
      } else {
        console.error('Error sending data:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="home-page" style={{
      background: isMobile ? '#F7EDE2' : undefined,
      minHeight: isMobile ? '844px' : undefined,
      maxWidth: isMobile ? '390px' : undefined,
      margin: isMobile ? '0 auto' : undefined,
      position: isMobile ? 'relative' : undefined
    }}>
      <header className="header"></header>
      <main style={{ 
        marginTop: isMobile ? '20px' : '50px',
        padding: isMobile ? '0 15px' : '0',
        paddingBottom: isMobile ? '80px' : '0'
      }}>
        <p style={{ fontSize: isMobile ? '16px' : '18px' }}>Question 1 of 9</p>
        <p className="bold-large-text" style={{ 
          marginBottom: '15px',
          fontSize: isMobile ? '20px' : '24px',
          lineHeight: isMobile ? '1.3' : '1.2'
        }}>
          What is your current bra size?
        </p>
        <p style={{ 
          marginBottom: isMobile ? '20px' : '30px',
          fontSize: isMobile ? '14px' : '16px',
          lineHeight: isMobile ? '1.4' : '1.3'
        }}>
          Even if it doesn't fit, that's OK — we are here to fix that.
        </p>

        {/* brand toggle (VS / Uniqlo) */}
        <div style={{ 
          marginBottom: isMobile ? '15px' : '8px',
          textAlign: 'center'
        }}>
          <SecondaryButton
            label={`Using ${cupBrand} cup sizes — tap to switch`}
            isActive={false}
            onClick={handleToggleCupBrand}
          />
        </div>

        <p className="bold-small-text" style={{ 
          marginBottom: isMobile ? '12px' : '18px',
          fontSize: isMobile ? '16px' : '18px',
          textAlign: isMobile ? 'center' : 'left'
        }}>Cup Size</p>
        <div style={{ 
          marginBottom: isMobile ? '20px' : '30px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: isMobile ? 'center' : 'flex-start',
          gap: isMobile ? '8px' : '10px'
        }}>
          {CUP_SIZES[cupBrand].map((size) => (
            <SecondaryButton
              key={size}
              label={size}
              isActive={activeCup === size}
              onClick={() => handleCupSizeClick(size)}
            />
          ))}
        </div>

        <p className="bold-small-text" style={{ 
          marginBottom: isMobile ? '12px' : '18px',
          fontSize: isMobile ? '16px' : '18px',
          textAlign: isMobile ? 'center' : 'left'
        }}>Band Size</p>
        <div style={{ 
          marginBottom: isMobile ? '20px' : '30px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: isMobile ? 'center' : 'flex-start',
          gap: isMobile ? '8px' : '10px'
        }}>
          {['28', '30', '32', '34', '36', '38', '40', '42', '44', '46', '48'].map((size) => (
            <SecondaryButton
              key={size}
              label={size}
              isActive={activeBand === size}
              onClick={() => handleBandSizeClick(size)}
            />
          ))}
        </div>

        <div style={{ 
          marginBottom: isMobile ? '30px' : '50px',
          textAlign: 'center'
        }}>
          <SecondaryButton
            label="I don't know my bra size"
            isActive={selectedBandSize === 'Unknown' && selectedCupSize === 'Unknown'}
            onClick={() => {
              setSelectedBandSize('Unknown');
              setSelectedCupSize('Unknown');
              setActiveBand('Unknown');
              setActiveCup('Unknown');
              setShowWarning(false);
            }}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <CustomButton label="Next Question" onClick={handleButtonClick} />
        </div>

        {showWarning && (
          <p style={{ 
            color: 'red', 
            marginTop: '20px',
            fontSize: isMobile ? '14px' : '16px',
            textAlign: 'center'
          }}>
            Please select both a band size and a cup size before proceeding.
          </p>
        )}
      </main>
      <footer className="footer"></footer>
    </div>
  );
}

export default CurrentSize;
