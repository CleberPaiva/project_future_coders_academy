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

// Admin Components (Placeholder - Implementation Needed)
const AdminDashboard = () => <div>Admin Dashboard (Em Construção)</div>;
const TeacherDashboard = () => <div>Teacher Dashboard (Em Construção)</div>;
const ParentDashboard = () => <div>Parent Dashboard (Em Construção)</div>;

// Coming Soon Page
const ComingSoon = ({ title }) => <div>{title} (Em Breve)</div>;

// Lessons Router (Placeholder - Implementation Needed)
const LessonsRouter = () => (
  <div>
    <Route path="algorithm-intro" element={<AlgorithmIntro />} />
    <Route path="directions-game" element={<DirectionsGame />} />
    <Route path="algorithm-routine" element={<AlgorithmRoutine />} />
    <Route path="routine-builder" element={<RoutineBuilder />} />
  </div>
);


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
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="teacher" element={<TeacherDashboard />} />
            <Route path="parent" element={<ParentDashboard />} />
            <Route path="student/:grade" element={<StudentAreaPage />} />
            <Route path="shop" element={<ComingSoon title="Loja de Kits Educativos" />} />
            <Route path="track/:grade" element={<TrackPage />} />
            <Route path="track/:grade/lessons/*" element={<LessonsRouter />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;