import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddMood from './pages/AddMood';
import Stats from './pages/Stats';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="min-h-screen bg-primary-50">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <>
              <Navigation />
              <Dashboard />
            </>
          </PrivateRoute>
        } />
        <Route path="/add-mood" element={
          <PrivateRoute>
            <>
              <Navigation />
              <AddMood />
            </>
          </PrivateRoute>
        } />
        <Route path="/stats" element={
          <PrivateRoute>
            <>
              <Navigation />
              <Stats />
            </>
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App; 