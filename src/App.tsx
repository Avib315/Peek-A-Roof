import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import FloatingDrone from './component/FloatingDrone';
import HomePage from './pages/HomePage';
import RealEstatePage from './pages/RealEstatePage';
import RoofInspectionPage from './pages/RoofInspectionPage';
import MediaContentPage from './pages/MediaContentPage';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <FloatingDrone />
      <Routes>
        <Route path="/"                element={<HomePage />} />
        <Route path="/real-estate"     element={<RealEstatePage />} />
        <Route path="/roof-inspection" element={<RoofInspectionPage />} />
        <Route path="/media-content"   element={<MediaContentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
