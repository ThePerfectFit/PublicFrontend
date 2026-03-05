import React, { useState, useEffect } from 'react';
import CustomButton from '../components/button';
import '../styles/homepage.css';
import { useNavigate } from 'react-router-dom';
import TextBox from '../components/textbox';
import SecondaryButton from '../components/newbutton';
import BandSize from '../assets/Measurements/BandSize.jpg'
import BustSize from '../assets/Measurements/BustSize.jpg'

function CurrentMeasurements() {
  const [inputValueBand, setInputValueBand] = useState('');
  const [inputValueBust, setInputValueBust] = useState('');
  const [warning, setWarning] = useState('');
  const [measurementUnit, setMeasurementUnit] = useState('inches');
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
    navigate('/size');
  };        
  
  const handleToggleUnit = () => {
    setMeasurementUnit(measurementUnit === 'inches' ? 'cm' : 'inches');
    setInputValueBand('');
    setInputValueBust('');
    setWarning('');
  };

  const validateMeasurements = () => {
    if (!inputValueBand || !inputValueBust) {
      setWarning('Please enter both your band and bust size.');
      return false;
    }

    const band = parseFloat(inputValueBand);
    const bust = parseFloat(inputValueBust);

    if (isNaN(band) || isNaN(bust)) {
      setWarning('Please enter valid numbers.');
      return false;
    }

    let bandInches = band;
    let bustInches = bust;
    
    if (measurementUnit === 'cm') {
      bandInches = band / 2.54;
      bustInches = bust / 2.54;
    }

    if (bandInches < 20 || bandInches > 60) {
      setWarning('Band measurement seems unreasonable. Please check your input.');
      return false;
    }

    if (bustInches < 20 || bustInches > 70) {
      setWarning('Bust measurement seems unreasonable. Please check your input.');
      return false;
    }

    if (bustInches < bandInches) {
      setWarning('Bust measurement should be larger than band measurement.');
      return false;
    }

    if (bustInches - bandInches > 15) {
      setWarning('Difference between bust and band seems too large. Please check your measurements.');
      return false;
    }

    setWarning('');
    return true;
  };        
  
  const handleForwardClick = async () => {
    if (!inputValueBand || !inputValueBust) {
      setWarning('Please enter both your band and bust size.');
      return;
    }

    if (!validateMeasurements()) {
      return;
    }

    setWarning('');

    const bandInches = measurementUnit === 'cm' ? parseFloat(inputValueBand) / 2.54 : parseFloat(inputValueBand);
    const bustInches = measurementUnit === 'cm' ? parseFloat(inputValueBust) / 2.54 : parseFloat(inputValueBust);

    const data = {
      inputValueBand: bandInches,
      inputValueBust: bustInches,
    };

    try {
      const response = await fetch('https://the-perfect-fit-backend.onrender.com/sendMeasurements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data sent successfully:', data);
        navigate('/shape');
      } else {
        console.error('Error sending data:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }

    console.log('Original measurements:', { band: inputValueBand, bust: inputValueBust, unit: measurementUnit });
    console.log('Converted to inches:', { band: bandInches, bust: bustInches });
  };

  const handleInputBandChange = (event) => {
    setInputValueBand(event.target.value);
    setWarning('');
  };

  const handleInputBustChange = (event) => {
    setInputValueBust(event.target.value);
    setWarning('');
  };

  return (
    <div className="home-page" style={{
      background: isMobile ? '#F7EDE2' : undefined,
      minHeight: isMobile ? '844px' : undefined,
      maxWidth: isMobile ? '390px' : undefined,
      margin: isMobile ? '0 auto' : undefined,
      position: isMobile ? 'relative' : undefined
    }}>
      <main style={{ 
        marginTop: isMobile ? '20px' : '50px',
        padding: isMobile ? '0 15px' : '0',
        paddingBottom: isMobile ? '80px' : '0'
      }}>
        <p style={{ 
          fontSize: isMobile ? '18px' : '18px',
          textAlign: 'center',
          marginBottom: isMobile ? '10px' : '0'
        }}>Question 2 of 9</p>
        
        <p className="bold-large-text" style={{ 
          marginBottom: isMobile ? '10px' : '15px',
          fontSize: isMobile ? '28px' : '24px',
          lineHeight: isMobile ? '32px' : '1.2',
          textAlign: 'center',
          color: isMobile ? '#730714' : undefined
        }}>What are your measurements?</p>
        
        <p style={{ 
          marginBottom: isMobile ? '20px' : '20px',
          fontSize: isMobile ? '16px' : '16px',
          textAlign: 'center',
          lineHeight: isMobile ? '20px' : '1.3'
        }}>Take both measurements without wearing a bra.</p>
        
        {/* Unit toggle */}
        <div style={{ 
          marginBottom: isMobile ? '15px' : '20px', 
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {isMobile ? (
            <div style={{
              width: '83px',
              height: '33px',
              background: '#F7EDE2',
              border: '1px solid #730714',
              borderRadius: '46px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }} onClick={handleToggleUnit}>
              <div style={{
                position: 'absolute',
                left: '8px',
                top: '6px',
                fontSize: '16px',
                fontWeight: measurementUnit === 'cm' ? '600' : '400',
                textAlign: 'center',
                color: measurementUnit === 'cm' ? '#F7EDE2' : '#730714',
                width: '30px',
                height: '20px',
                lineHeight: '20px',
                zIndex: 1
              }}>cm</div>
              <div style={{
                position: 'absolute',
                right: '8px',
                top: '6px',
                fontSize: '16px',
                fontWeight: measurementUnit === 'inches' ? '600' : '400',
                textAlign: 'center',
                color: measurementUnit === 'inches' ? '#F7EDE2' : '#730714',
                width: '30px',
                height: '20px',
                lineHeight: '20px',
                zIndex: 1
              }}>in</div>
              <div style={{
                position: 'absolute',
                left: measurementUnit === 'cm' ? '2px' : '42px',
                top: '2px',
                width: '39px',
                height: '29px',
                background: '#730714',
                borderRadius: '46px',
                transition: 'all 0.3s ease',
                zIndex: 0
              }}></div>
            </div>
          ) : (
            <SecondaryButton
              label={`Currently using: ${measurementUnit.toUpperCase()} — tap to switch`}
              isActive={false}
              onClick={handleToggleUnit}
            />
          )}
        </div>

        {/* Mobile layout for measurement inputs */}
        {isMobile ? (
          <div style={{ marginBottom: '20px' }}>
            {/* Band Size Section */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                marginBottom: '10px',
                justifyContent: 'center'
              }}>
                <img 
                  src={BandSize} 
                  alt="Band Size Measurement" 
                  style={{
                    width: '100px',
                    height: '98px',
                    border: '1px solid #730714',
                    marginRight: '12px',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1, maxWidth: '250px' }}>
                  <p style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    marginBottom: '6px',
                    color: '#000000'
                  }}>Band Size</p>
                  <div style={{
                    width: '100%',
                    height: '36px',
                    background: '#FFFFFF',
                    border: '1px solid #730714',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '6px'
                  }}>
                    <input
                      type="text"
                      placeholder="Eg. 34"
                      value={inputValueBand}
                      onChange={handleInputBandChange}
                      style={{
                        position: 'absolute',
                        left: '10px',
                        top: '8px',
                        width: '40px',
                        height: '18px',
                        border: 'none',
                        background: 'transparent',
                        fontSize: '14px',
                        fontWeight: '300',
                        color: '#AF737A',
                        outline: 'none'
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      right: '10px',
                      top: '8px',
                      fontSize: '14px',
                      fontWeight: '300',
                      color: '#AF737A'
                    }}>{measurementUnit === 'inches' ? 'inch' : 'cm'}</span>
                  </div>
                  <p style={{
                    fontSize: '10px',
                    lineHeight: '12px',
                    color: '#000000',
                    margin: 0
                  }}>
                    Wrap the tape underneath the bust, directly where your breast tissue meets your torso. Round up to the next even number.
                  </p>
                </div>
              </div>
            </div>

            {/* Bust Size Section */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                marginBottom: '10px',
                justifyContent: 'center'
              }}>
                <img 
                  src={BustSize} 
                  alt="Bust Size Measurement" 
                  style={{
                    width: '100px',
                    height: '98px',
                    border: '1px solid #730714',
                    marginRight: '12px',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1, maxWidth: '250px' }}>
                  <p style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    marginBottom: '6px',
                    color: '#000000'
                  }}>Bust Size</p>
                  <div style={{
                    width: '100%',
                    height: '36px',
                    background: '#FFFFFF',
                    border: '1px solid #730714',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '6px'
                  }}>
                    <input
                      type="text"
                      placeholder="Eg. 38"
                      value={inputValueBust}
                      onChange={handleInputBustChange}
                      style={{
                        position: 'absolute',
                        left: '10px',
                        top: '8px',
                        width: '40px',
                        height: '18px',
                        border: 'none',
                        background: 'transparent',
                        fontSize: '14px',
                        fontWeight: '300',
                        color: '#AF737A',
                        outline: 'none'
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      right: '10px',
                      top: '8px',
                      fontSize: '14px',
                      fontWeight: '300',
                      color: '#AF737A'
                    }}>{measurementUnit === 'inches' ? 'inch' : 'cm'}</span>
                  </div>
                  <p style={{
                    fontSize: '10px',
                    lineHeight: '12px',
                    color: '#000000',
                    margin: 0
                  }}>
                    Keep the tape in the same position on your back and move it up loosely over the fullest part of your bust. Round up to the next even number.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop layout */
          <>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <SecondaryButton
                label={`Currently using: ${measurementUnit.toUpperCase()} — tap to switch`}
                isActive={false}
                onClick={handleToggleUnit}
              />
              <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                We'll automatically convert cm to inches and validate your measurements.
              </p>
            </div>

            {/* Measurement inputs */}
            <div className="measurement-row" style={{ marginBottom: '25px' }}>
              <div className="measurement-column" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p className="bold-small-text" style={{ marginBottom: '18px' }}>Band Size ({measurementUnit})</p>
                <div style={{ width: '200px', maxWidth: '200px' }}>
            <TextBox
                    placeholder={`Enter size in ${measurementUnit}`}
              value={inputValueBand}
              onChange={handleInputBandChange}
            />
          </div>
              </div>
              <div className="measurement-column" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p className="bold-small-text" style={{ marginBottom: '18px' }}>Bust Size ({measurementUnit})</p>
                <div style={{ width: '200px', maxWidth: '200px' }}>
            <TextBox
                    placeholder={`Enter size in ${measurementUnit}`}
              value={inputValueBust}
              onChange={handleInputBustChange}
            />
          </div>
        </div>
            </div>

            {/* Instructions */}
            <div className="measurement-row" style={{ marginBottom: '25px' }}>
              <div className="measurement-column">
                <p className="bold-smallest-text" style={{ marginBottom: '10px', textAlign: 'center' }}>To measure Band Size:</p>
                <p style={{ fontSize: '14px', lineHeight: '1.5', textAlign: 'center' }}>
                  Place the tape measure around your body underneath the bust, holding it straight. 
                  It should be held tight around the body. Take your measurement immediately after exhaling.
            </p>
          </div>
              <div className="measurement-column">
                <p className="bold-smallest-text" style={{ marginBottom: '10px', textAlign: 'center' }}>To measure Bust Size:</p>
                <p style={{ fontSize: '14px', lineHeight: '1.5', textAlign: 'center' }}>
                  Keeping the tape measure in the same position on your back and move it up loosely 
                  over the fullest part of your bust, horizontally and with the centimetre side facing out.
            </p>
          </div>
        </div>

            {/* Images */}
            <div className="measurement-row" style={{ marginBottom: '25px', justifyContent: 'center' }}>
              <div className="measurement-column">
          <img 
                    src={BandSize} 
                  alt="Band Size Measurement" 
                    className="dummy-photo-shape-small" 
          />
          </div>
              <div className="measurement-column">
          <img 
                    src={BustSize} 
                  alt="Bust Size Measurement" 
                    className="dummy-photo-shape-small" 
                  />
          </div>
        </div>
          </>
        )}

        {/* Warning */}
        {warning && (
          <p style={{ 
            color: 'red', 
            fontSize: isMobile ? '14px' : '14px', 
            marginTop: '8px', 
            textAlign: 'center' 
          }}>
            {warning}
          </p>
        )}

        {/* Valid ranges info - Desktop only */}
        {!isMobile && (
          <p style={{ fontSize: '12px', color: '#888', marginTop: '8px', textAlign: 'center' }}>
            Valid ranges: Band {measurementUnit === 'inches' ? '20-60"' : '51-152cm'}, 
            Bust {measurementUnit === 'inches' ? '20-70"' : '51-178cm'}
          </p>
        )}

        {/* Navigation buttons */}
        <div style={{ 
          marginTop: isMobile ? '30px' : '20px',
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
          <div className="measurement-column">
                <CustomButton label="Previous Question" onClick={handleBackClick} />
          </div>
          <div className="measurement-column">
                <CustomButton label="Next Question" onClick={handleForwardClick} />
          </div>
        </div>
        )}
        </div>
      </main>
    </div>
  );
}

export default CurrentMeasurements;
