import React, { useState, useEffect } from 'react';
import Touching from '../assets/Distance/Touching.jpg';
import SpreadApart from '../assets/Distance/SpreadApart.jpg';
import OutwardSpread from '../assets/Distance/OutwardSpread.jpg';
import CustomButton from '../components/button';
import '../styles/homepage.css'; 
import { useNavigate } from 'react-router-dom';
import WhiteContainer from '../components/whitecontainer';

function CurrentDistance() {
  const [distance, setDistance] = useState(''); // State variable for distance
  const [selectedDistance, setSelectedDistance] = useState(''); // State variable for selected distance
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
    navigate('/shape'); // Navigate to the Shape page
  };

  const handleForwardClick = async () => {
    if (!distance) {
      setWarning('Please select your distance.');
      return;
    }

    const data = {
      distance: distance, // Use selectedDistance instead of distance
    };

    try {
      const response = await fetch('https://the-perfect-fit-backend.onrender.com/sendDistance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data sent successfully:', data);
        navigate('/support'); // Navigate to the Support page
      } else {
        console.error('Error sending data:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
    console.log(selectedDistance);
  };

  const handleDistanceSelect = (selectedDistance) => {
    setWarning('');
    setDistance(selectedDistance); // Update the distance state
    setSelectedDistance(selectedDistance); // Set selected distance
  };

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value);
    setSliderValue(value);
    setWarning('');
    
    // Map slider value to distance option
    const distanceOptions = ['Touching', 'Spread Apart', 'Outward Spread'];
    const selectedOption = distanceOptions[value - 1];
    setDistance(selectedOption);
    setSelectedDistance(selectedOption);
  };

  const distanceOptions = [
    {
      name: 'Touching',
      image: Touching,
      description: 'Your breasts touch each other somewhere in the middle'
    },
    {
      name: 'Spread Apart',
      image: SpreadApart,
      description: 'Your breasts have a 1 or 2 finger space between them'
    },
    {
      name: 'Outward Spread',
      image: OutwardSpread,
      description: 'Your breasts have a 3 or more finger space between them and point outwards'
    }
  ];

  // Get current option based on slider value
  const currentOption = distanceOptions[sliderValue - 1];

  return (
    <div className="home-page" style={{
      background: isMobile ? '#F7EDE2' : undefined,
      minHeight: isMobile ? '1255px' : undefined,
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
        }}>Question 4 of 9</p>
        
        <p className="bold-large-text" style={{ 
          marginBottom: isMobile ? '15px' : '15px',
          fontSize: isMobile ? '40px' : '24px',
          lineHeight: isMobile ? '40px' : '1.2',
          textAlign: 'center',
          color: isMobile ? '#730714' : undefined
        }}>
          How far apart are they set?
        </p>
        
        <p style={{ 
          marginBottom: isMobile ? '30px' : '50px',
          fontSize: isMobile ? '16px' : '16px',
          textAlign: 'center',
          lineHeight: isMobile ? '20px' : '1.3'
        }}>
          This helps us gauge if you might need some extra padding
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
              height: currentOption.name === 'Touching' ? '248px' : currentOption.name === 'Spread Apart' ? '218px' : '240px',
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
                alt={`${currentOption.name} Distance`} 
                style={{
                  width: '272px',
                  height: '162px',
                  objectFit: 'cover',
                  margin: '-40px 0px'
                }}
              />
              <div style={{
                width: '272px',
                height: currentOption.name === 'Touching' ? '126px' : currentOption.name === 'Spread Apart' ? '96px' : '118px',
                background: '#FFFFFF',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: currentOption.name === 'Touching' ? '18px' : '10px'
              }}>
                <p style={{
                  width: '252px',
                  height: '22px',
                  fontSize: '18px',
                  fontWeight: currentOption.name === 'Touching' ? '700' : '600',
                  lineHeight: '22px',
                  textAlign: 'center',
                  color: '#730714',
                  margin: 0
                }}>{currentOption.name}</p>
                <p style={{
                  width: '252px',
                  height: currentOption.name === 'Touching' ? '66px' : currentOption.name === 'Spread Apart' ? '44px' : '66px',
                  fontSize: '18px',
                  fontWeight: '400',
                  lineHeight: '22px',
                  textAlign: 'center',
                  color: '#730714',
                  margin: 0
                }}>{currentOption.description}</p>
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
            <div className="measurement-column">
              <WhiteContainer 
                onClick={() => handleDistanceSelect('Touching')} 
                isSelected={selectedDistance === 'Touching'}
              >
                <img src={Touching} alt="Touching" className="dummy-photo-shape" />
                <p className="bold-shape-text-bold">Touching</p>
                <p className="bold-shape-text" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                  Your breasts touch <br /> each other somewhere <br /> in the middle
                </p>
              </WhiteContainer>
            </div>
            <div className="measurement-column">
              <WhiteContainer 
                onClick={() => handleDistanceSelect('Spread Apart')} 
                isSelected={selectedDistance === 'Spread Apart'}
              >
                <img src={SpreadApart} alt="Spread Apart" className="dummy-photo-shape" />
                <p className="bold-shape-text-bold">Spread Apart</p>
                <p className="bold-shape-text" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                  Your breasts have a 1 or 2 finger space between <br /> them
                </p>
              </WhiteContainer>
            </div>
            <div className="measurement-column">
              <WhiteContainer 
                onClick={() => handleDistanceSelect('Outward Spread')} 
                isSelected={selectedDistance === 'Outward Spread'}
              >
                <img src={OutwardSpread} alt="Outward Spread" className="dummy-photo-shape" />
                <p className="bold-shape-text-bold">Outward Spread</p>
                <p className="bold-shape-text" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                  Your breasts have a 3 or more finger space between them and point outwards
                </p>
              </WhiteContainer>
            </div>
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

export default CurrentDistance;
