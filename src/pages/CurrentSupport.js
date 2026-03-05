import React, { useState, useEffect } from 'react';
import SemiSettled from '../assets/Support/SemiSettled.jpg';
import Settled from '../assets/Support/Settled.jpg';
import Supported from '../assets/Support/Supported.jpg';
import CustomButton from '../components/button';
import '../styles/homepage.css';
import { useNavigate } from 'react-router-dom';
import WhiteContainerSmall from '../components/whitecontainersmall';

function CurrentSupport() {
  const navigate = useNavigate();
  const [support, setSupport] = useState(''); // Initialize state for support
  const [isMobile, setIsMobile] = useState(false);
  const [warning, setWarning] = useState(''); 

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBackClick = () => {
    navigate('/distance');
  };        
  
  const handleForwardClick = async () => {
    if (!support) {
      setWarning('Please select your support.');
      return;
    }
    const data = {
      support: support
    };

    try {
      const response = await fetch('https://the-perfect-fit-backend.onrender.com/sendSupport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data sent successfully:', data);
        navigate('/cup'); // Navigate to the Cup page
      } else {
        console.error('Error sending data:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
    console.log(support);
  };

  const handleSupportClick = (supportType) => {
    setWarning('');
    setSupport(supportType); 
  };

  const supportOptions = [
    {
      name: 'Supported',
      image: Supported
    },
    {
      name: 'Semi Settled',
      image: SemiSettled
    },
    {
      name: 'Settled',
      image: Settled
    }
  ];

  return (
    <div className="home-page" style={{
      background: isMobile ? '#F7EDE2' : undefined,
      minHeight: isMobile ? '1161px' : undefined,
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
        }}>Question 5 of 9</p>
        
        <p className="bold-large-text" style={{ 
          marginBottom: isMobile ? '15px' : '15px',
          fontSize: isMobile ? '40px' : '24px',
          lineHeight: isMobile ? '40px' : '1.2',
          textAlign: 'center',
          color: isMobile ? '#730714' : undefined
        }}>
          Where do your breasts settle?
        </p>
        
        <p style={{ 
          marginBottom: isMobile ? '30px' : '50px',
          fontSize: isMobile ? '16px' : '16px',
          textAlign: 'center',
          lineHeight: isMobile ? '20px' : '1.3'
        }}>
          This helps us gauge if you might need some extra support
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
            {supportOptions.map((option, index) => (
              <div
                key={option.name}
                onClick={() => handleSupportClick(option.name)}
                style={{
                  width: '272px',
                  height: '204px',
                  border: support === option.name ? '3px solid #730714' : '2px solid #730714',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: support === option.name ? '#F7EDE2' : '#FFFFFF',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 0,
                  boxShadow: support === option.name ? '0 4px 8px rgba(115, 7, 20, 0.2)' : 'none'
                }}
              >
                <img 
                  src={option.image} 
                  alt={`${option.name} Support`} 
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
                  }}>{option.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop layout */
          <div className="measurement-row" style={{ marginBottom: '50px' }}>
            <div className="measurement-column">
              <WhiteContainerSmall onClick={() => handleSupportClick('Supported')} isSelected={support === 'Supported'}>
                <div>
                  <img src={Supported} alt="Supported" className="dummy-photo-shape" />
                  <p className="bold-shape-text-bold">Supported</p>
                </div>
              </WhiteContainerSmall>
            </div>
            <div className="measurement-column">
              <WhiteContainerSmall onClick={() => handleSupportClick('Semi Settled')} isSelected={support === 'Semi Settled'}>
                <div>
                  <img src={SemiSettled} alt="Semi Settled" className="dummy-photo-shape" />
                  <p className="bold-shape-text-bold">Semi Settled</p>
                </div>
              </WhiteContainerSmall>
            </div>
            <div className="measurement-column">
              <WhiteContainerSmall onClick={() => handleSupportClick('Settled')} isSelected={support === 'Settled'}>
                <div>
                  <img src={Settled} alt="Settled" className="dummy-photo-shape" />
                  <p className="bold-shape-text-bold">Settled</p>
                </div>
              </WhiteContainerSmall>
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
                <CustomButton label='Previous Question' onClick={handleBackClick}/>
              </div>
              <div className="measurement-column" style={{ marginLeft: '25px' }}>
                <CustomButton label='Next Question' onClick={handleForwardClick}/>
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

export default CurrentSupport;
