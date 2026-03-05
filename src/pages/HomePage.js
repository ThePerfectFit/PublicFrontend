import React from 'react';
import CustomButton from '../components/button';
import HomePagePhoto from '../assets/HomePagePhoto.jpg';
import '../styles/homepage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/size'); // Navigate to the CurrentSize page
  };
  return (
    <div>
                        <header className="header">
                        </header>
    <div className="home-page" style={{justifyContent: 'center'}}>
      <main>
        <div className="measurement-row">
          <div className="measurement-column">
          <img src={HomePagePhoto} alt="Example" className="example-photo" />
          </div>
          <div className="home-page-content-container">
          <p className="bold-large-text" style={{ marginBottom: '15px' }}>80% Of Women Wear The Wrong Bra Size*</p>
        <p className='bold-smaller-text' style={{ marginBottom: '50px' }}>Let’s help you find The Perfect Fit <br />and be part of the other 20%</p>
        <p className='bold-smaller-text' style={{ marginBottom: '50px' }}>All you need is your current bra (if you have <br />one), a measuring tape and a mirror</p>
        <CustomButton label='Let’s Get Started!' onClick={handleButtonClick} />
          </div>
        </div>
      </main>
    </div>
    <footer className="footer">
        {/* <p>&copy; 2024 My React App. All rights reserved.</p> */}
      </footer>
    </div>
  );
}

export default HomePage;