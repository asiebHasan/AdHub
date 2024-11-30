import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './components/Layout';
// import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdsPage from './pages/AdsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<LandingPage />} />
          <Route path='home' element={<Home />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='ads' element={<AdsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
