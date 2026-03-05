import React, { useState, useEffect } from 'react';
import one from '../assets/Cup/one.jpg';
import three from '../assets/Cup/three.jpg';
import five from '../assets/Cup/five.jpg';

import CustomButton from '../components/button';
import '../styles/homepage.css';
import { useNavigate } from 'react-router-dom';
import WhiteContainerSmall from '../components/whitecontainersmall';

function CurrentCup() {
  const [cup, setCup] = useState(''); // State variable for cup value
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate(); 
  const [warning, setWarning] = useState(''); 
  const [sliderValue, setSliderValue] = useState(1); // State for slider value (1-3)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBackClick = () => {
    navigate('/support'); // Navigate to the Support page
  };

  const handleForwardClick = async () => {
    if (!cup) {
      setWarning('Please select your cup fit.');
      return;
    }

    const data = {
      cup: Number(cup)
    };

    try {
      const response = await fetch('https://the-perfect-fit-backend.onrender.com/sendCup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data sent successfully:', data);
        navigate('/band'); // Navigate to the Band page
      } else {
        console.error('Error sending data:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
    console.log(cup);
  };

  const handleCupClick = (cupValue) => {
    setWarning('');
    setCup(cupValue); // Update the cup value
  };

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value);
    setSliderValue(value);
    setWarning('');
    setCup(value);
  };

  // Array of images - now only 3 (using 1st, 3rd, 5th images)
  const cupImages = [one, three, five];
  const cupLabels = ['Too Small', 'Just Right', 'Too Big'];

  const cupOptions = [
    {
      name: 'Too Small',
      image: one,
      value: 1
    },
    {
      name: 'Just Right',
      image: three,
      value: 2
    },
    {
      name: 'Too Big',
      image: five,
      value: 3
    }
  ];

  // Get current option based on slider value
  const currentOption = cupOptions[sliderValue - 1];

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
        <p style={{ 
          fontSize: isMobile ? '18px' : '18px',
          textAlign: 'center',
          marginBottom: isMobile ? '10px' : '0'
        }}>Question 6 of 9</p>
        
        <p className="bold-large-text" style={{ 
          marginBottom: isMobile ? '15px' : '15px',
          fontSize: isMobile ? '40px' : '24px',
          lineHeight: isMobile ? '40px' : '1.2',
          textAlign: 'center',
          color: isMobile ? '#730714' : undefined
        }}>
          How do your current bra cups fit?
        </p>
        
        <p style={{ 
          marginBottom: isMobile ? '30px' : '50px',
          fontSize: isMobile ? '16px' : '16px',
          textAlign: 'center',
          lineHeight: isMobile ? '20px' : '1.3'
        }}>
          Select the option that best describes your fit
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
            {/* Single container that changes based on slider */}
            <div style={{
              width: '272px',
              height: '204px',
              border: '2px solid #730714',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#FFFFFF',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 0
            }}>
              <img 
                src={currentOption.image} 
                alt={`${currentOption.name} Cup`} 
                style={{
                  width: '272px',
                  height: '162px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                width: '272px',
                height: '42px',
                background: '#FFFFFF',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '18px'
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
                }}>{currentOption.name}</p>
              </div>
            </div>

            {/* Slider with #730714 color */}
            <div style={{
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '40px'
              }}>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="1"
                  value={sliderValue}
                  onChange={handleSliderChange}
                  style={{
                    width: '100%',
                    height: '40px',
                    background: 'transparent',
                    outline: 'none',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    margin: 0,
                    padding: 0,
                    border: 'none'
                  }}
                />
                {/* Custom slider track */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  right: '0',
                  height: '2px',
                  background: '#730714',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }} />
                {/* Custom slider thumb */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${((sliderValue - 1) / 2) * 100}%`,
                  width: '20px',
                  height: '20px',
                  background: '#FFFFFF',
                  border: '2px solid #730714',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none'
                }} />
              </div>
            </div>
          </div>
        ) : (
          /* Desktop layout */
          <div className="measurement-row" style={{ marginBottom: '50px' }}>
            {cupImages.map((image, index) => (
              <div className="measurement-column" key={index}>
                <WhiteContainerSmall 
                  onClick={() => handleCupClick(index + 1)} 
                  isSelected={cup === index + 1}
                >
                  <div>
                    <img 
                      src={image} 
                      alt={`Cup Size ${index + 1}`} 
                      className="dummy-photo-shape" 
                    />
                    <p className="bold-shape-text-bold">{cupLabels[index]}</p>
                  </div>
                </WhiteContainerSmall>
              </div>
            ))}
          </div>
        )}

        {/* Navigation buttons */}
        <div style={{ 
          marginTop: isMobile ? '30px' : '0',
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

export default CurrentCup;
