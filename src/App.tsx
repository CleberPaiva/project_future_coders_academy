import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TracksPage from './pages/TracksPage';
import HowItWorksPage from './pages/HowItWorksPage';
import TrackPage from './pages/TrackPage';
import StudentAreaPage from './pages/StudentAreaPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Lessons
import AlgorithmIntro from './components/lessons/AlgorithmIntro';
import DirectionsGame from './components/lessons/DirectionsGame';
import AlgorithmRoutine from './components/lessons/AlgorithmRoutine';
import RoutineBuilder from './components/lessons/RoutineBuilder';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="tracks" element={<TracksPage />} />
            <Route path="how-it-works" element={<HowItWorksPage />} />
            <Route path="track/:grade" element={<TrackPage />} />
            <Route path="track/:grade/lessons/algorithm-intro" element={<AlgorithmIntro />} />
            <Route path="track/:grade/lessons/directions-game" element={<DirectionsGame />} />
            <Route path="track/:grade/lessons/algorithm-routine" element={<AlgorithmRoutine />} />
            <Route path="track/:grade/lessons/routine-builder" element={<RoutineBuilder />} />
            <Route path="student-area/:grade" element={<StudentAreaPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;