import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './utilites/PrivateRoute';

const Landing = lazy(() => import('./pages/landing'));
const SignIn = lazy(() => import('./pages/SignIn'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Home = lazy(() => import('./pages/subpages/home'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />

          <Route  element={<PrivateRoute />}>

          <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
         
          {/* Add more nested routes as needed */}
        </Route>

          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
