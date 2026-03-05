import './App.css';
import HomePage from './pages/HomePage';
import CurrentBand from './pages/CurrentBand';
import CurrentCup from './pages/CurrentCup';
import CurrentSupport from './pages/CurrentSupport';
import CurrentHook from './pages/CurrentHook';
import CurrentMeasurements from './pages/CurrentMeasurements';
import CurrentResults from './pages/CurrentResults';
import CurrentDistance from './pages/CurrentDistance';
import CurrentShape from './pages/CurrentShape';
import CurrentSize from './pages/CurrentSize';
import CurrentStrap from './pages/CurrentStrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import BottomNavbar from './components/BottomNavbar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/support" element={<CurrentSupport />} />
          <Route path="/strap" element={<CurrentStrap />} />
          <Route path="/size" element={<CurrentSize />} />
          <Route path="/shape" element={<CurrentShape />} />
          <Route path="/results" element={<CurrentResults />} />
          <Route path="/measurements" element={<CurrentMeasurements />} />
          <Route path="/hook" element={<CurrentHook />} />
          <Route path="/distance" element={<CurrentDistance />} />
          <Route path="/cup" element={<CurrentCup />} />
          <Route path="/band" element={<CurrentBand />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <BottomNavbar />
      </BrowserRouter>
    </div>
  );
}

export default App;
