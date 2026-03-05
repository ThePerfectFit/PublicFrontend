import React, { useState, useEffect } from 'react';
import Relaxed from '../assets/Shape/Relaxed.jpg';
import LowProfile from '../assets/Shape/LowProfile.jpg';
import SideSet from '../assets/Shape/SideSet.jpg';
import Bell from '../assets/Shape/Bell.jpg';
import Teardrop from '../assets/Shape/Teardrop.jpg';
import Round from '../assets/Shape/Round.jpg';

import ShapeButton from '../components/shapeButton';
import CustomButton from '../components/button';
import '../styles/homepage.css';
import { useNavigate } from 'react-router-dom';
import WhiteContainer from '../components/whitecontainer';

function CurrentShape() {
  const [shape, setShape] = useState(''); // Initialize shape state
  const [selectedShape, setSelectedShape] = useState(''); // Initialize selectedShape state
  const [warning, setWarning] = useState(''); 
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBackClick = () => {
    navigate('/measurements'); // Navigate to the Shape page
  };

  const handleForwardClick = async () => {
    if (!shape) {
      setWarning('Please select your shape.');
      return;
    }
    const data = {
      shape: shape,
    };

    try {
      const response = await fetch('https://the-perfect-fit-backend.onrender.com/sendShape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data sent successfully:', data);
        navigate('/distance'); // Navigate to the next page
      } else {
        console.error('Error sending data:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
    console.log(shape);
  };

  const handleShapeClick = (selectedShape) => {
    setWarning('');
    setShape(selectedShape);
    setSelectedShape(selectedShape);
    console.log(`Selected shape: ${selectedShape}`);
  };

  const shapeOptions = [
    {
      name: 'Relaxed',
      image: Relaxed,
      description: 'Soft tissue, breasts pull downwards. Nipples point either forward or down.'
    },
    {
      name: 'Low Profile',
      image: LowProfile,
      description: 'Dense tissue, breasts are less full and set close to body. Nipples point forward.'
    },
    {
      name: 'Side Set',
      image: SideSet,
      description: 'Tissue spread apart, breasts are to the sides. Nipples point in opposite directions.'
    },
    {
      name: 'Bell',
      image: Bell,
      description: 'Tissue is fuller at bottom, slimmer at top. Nipples point forward or down.'
    },
    {
      name: 'Teardrop',
      image: Teardrop,
      description: 'Tissue is a bit fuller at the bottom, breasts are round. Nipples point forward.'
    },
    {
      name: 'Round',
      image: Round,
      description: 'Tissue equally full on top, bottom and sides. Nipples point forward or up.'
    }
  ];

  return (
    <div className="home-page" style={{
      background: isMobile ? '#F7EDE2' : undefined,
      minHeight: isMobile ? '2391px' : undefined,
      maxWidth: isMobile ? '390px' : undefined,
      margin: isMobile ? '0 auto' : undefined,
      position: isMobile ? 'relative' : undefined
    }}>
      <header className="header"></header>
      <main style={{ 
        marginTop: isMobile ? '20px' : '50px',
        padding: isMobile ? '0 15px' : '0',
        paddingBottom: isMobile ? '80px' : '50px'
      }}>
        <p style={{ 
          fontSize: isMobile ? '18px' : '18px',
          textAlign: 'center',
          marginBottom: isMobile ? '10px' : '0'
        }}>Question 3 of 9</p>
        
        <p className="bold-large-text" style={{ 
          marginBottom: isMobile ? '15px' : '15px',
          fontSize: isMobile ? '40px' : '24px',
          lineHeight: isMobile ? '40px' : '1.2',
          textAlign: 'center',
          color: isMobile ? '#730714' : undefined
        }}>
          What breast shape is closest to yours?
        </p>
        
        <p style={{ 
          marginBottom: isMobile ? '30px' : '50px',
          fontSize: isMobile ? '16px' : '16px',
          textAlign: 'center',
          lineHeight: isMobile ? '20px' : '1.3'
        }}>
          This helps us recommend a more comfortable bra, catered to your body
        </p>

        {/* Mobile layout */}
        {isMobile ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '30px',
            marginBottom: '30px'
          }}>
            {shapeOptions.map((option, index) => (
              <div
                key={option.name}
                onClick={() => handleShapeClick(option.name)}
                style={{
                  width: '272px',
                  height: '280px',
                  border: selectedShape === option.name ? '3px solid #730714' : '2px solid #730714',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: selectedShape === option.name ? '#F7EDE2' : '#FFFFFF',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedShape === option.name ? '0 4px 8px rgba(115, 7, 20, 0.2)' : 'none'
                }}
              >
                <img 
                  src={option.image} 
                  alt={`${option.name} Shape`} 
                  style={{
                    width: '272px',
                    height: '162px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  width: '272px',
                  height: '118px',
                  background: '#FFFFFF',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <p style={{
                    width: '252px',
                    height: '22px',
                    fontSize: '18px',
                    fontWeight: '600',
                    lineHeight: '22px',
                    textAlign: 'center',
                    color: '#730714',
                    margin: 0
                  }}>{option.name}</p>
                  <p style={{
                    width: '252px',
                    height: '66px',
                    fontSize: '18px',
                    fontWeight: '400',
                    lineHeight: '22px',
                    textAlign: 'center',
                    color: '#730714',
                    margin: 0
                  }}>{option.description}</p>
                </div>
              </div>
            ))}
            
            <div
              onClick={() => handleShapeClick('Unknown')}
              style={{
                width: '127px',
                height: '42px',
                background: selectedShape === 'Unknown' ? '#F7EDE2' : '#FFFFFF',
                border: selectedShape === 'Unknown' ? '3px solid #730714' : '2px solid #730714',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginTop: '10px',
                boxShadow: selectedShape === 'Unknown' ? '0 4px 8px rgba(115, 7, 20, 0.2)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#730714'
              }}>I'm not sure</span>
            </div>
          </div>
        ) : (
          /* Desktop layout */
          <>
            <div className="measurement-row" style={{ marginBottom: '30px' }}>
              <div className="measurement-column">
                <WhiteContainer 
                  onClick={() => handleShapeClick('Relaxed')}
                  isSelected={selectedShape === 'Relaxed'}
                >
                  <img src={Relaxed} alt="Relaxed Shape" className="dummy-photo-shape" />
                  <p className="bold-shape-text-bold">Relaxed</p>
                  <p className="bold-shape-text" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                    Soft tissue, breasts pull downwards. Nipples point either forward or down.
                  </p>
                </WhiteContainer>
              </div>
              <div className="measurement-column">
                <WhiteContainer 
                  onClick={() => handleShapeClick('Low Profile')}
                  isSelected={selectedShape === 'Low Profile'}
                >
                  <img src={LowProfile} alt="Low Profile Shape" className="dummy-photo-shape" />
                  <p className="bold-shape-text-bold">Low Profile</p>
                  <p className="bold-shape-text" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                    Dense tissue, breasts are less full and set close to body. Nipples point forward.
                  </p>
                </WhiteContainer>
              </div>
              <div className="measurement-column">
                <WhiteContainer 
                  onClick={() => handleShapeClick('Side Set')}
                  isSelected={selectedShape === 'Side Set'}
                >
                  <img src={SideSet} alt="Side Set Shape" className="dummy-photo-shape" />
                  <p className="bold-shape-text-bold">Side Set</p>
                  <p className="bold-shape-text" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                    Tissue spread apart, breasts are to the sides. Nipples point in opposite directions.
                  </p>
                </WhiteContainer>
              </div>
            </div>
            <div className="measurement-row" style={{ marginBottom: '30px' }}>
              <div className="measurement-column">
                <WhiteContainer 
                  onClick={() => handleShapeClick('Bell')}
                  isSelected={selectedShape === 'Bell'}
                >
                  <img src={Bell} alt="Bell Shape" className="dummy-photo-shape" />
                  <p className="bold-shape-text-bold">Bell</p>
                  <p className="bold-shape-text" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                    Tissue is fuller at bottom, slimmer at top. Nipples point forward or down.
                  </p>
                </WhiteContainer>
              </div>
              <div className="measurement-column">
                <WhiteContainer 
                  onClick={() => handleShapeClick('Teardrop')}
                  isSelected={selectedShape === 'Teardrop'}
                >
                  <img src={Teardrop} alt="Teardrop Shape" className="dummy-photo-shape" />
                  <p className="bold-shape-text-bold">Teardrop</p>
                  <p className="bold-shape-text" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                    Tissue is a bit fuller at the bottom, breasts are round. Nipples point forward.
                  </p>
                </WhiteContainer>
              </div>
              <div className="measurement-column">
                <WhiteContainer 
                  onClick={() => handleShapeClick('Round')}
                  isSelected={selectedShape === 'Round'}
                >
                  <img src={Round} alt="Round Shape" className="dummy-photo-shape" />
                  <p className="bold-shape-text-bold">Round</p>
                  <p className="bold-shape-text" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                    Tissue equally full on top, bottom, and sides. Nipples point forward or up.
                  </p>
                </WhiteContainer>
              </div>
            </div>
            <ShapeButton 
              label="I'm not sure" 
              onClick={() => handleShapeClick('Unknown')} 
              selected={selectedShape === 'Unknown'}
            />
          </>
        )}

        {/* Navigation buttons */}
        <div style={{ 
          marginTop: isMobile ? '30px' : '50px',
          textAlign: 'center'
        }}>
          {isMobile ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              <div style={{
                width: '243px',
                height: '42px',
                background: '#730714',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                cursor: 'pointer'
              }} onClick={handleForwardClick}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#FFFFFF'
                }}>NEXT STEP</span>
              </div>
              <div style={{
                fontSize: '16px',
                color: '#730714',
                textDecoration: 'underline',
                cursor: 'pointer'
              }} onClick={handleBackClick}>
                Previous Step
              </div>
            </div>
          ) : (
            <div className="measurement-row">
              <div className="measurement-column" style={{ marginRight: '25px' }}>
                <CustomButton label='Previous Question' onClick={handleBackClick} />
              </div>
              <div className="measurement-column" style={{ marginLeft: '25px' }}>
                <CustomButton label='Next Question' onClick={handleForwardClick} />
              </div>
            </div>
          )}
        </div>

        {warning && (
          <p style={{ 
            color: 'red', 
            marginTop: '20px',
            textAlign: 'center',
            fontSize: isMobile ? '14px' : '16px'
          }}>{warning}</p>
        )}
      </main>
      <footer className="footer"></footer>
    </div>
  );
}

export default CurrentShape;
