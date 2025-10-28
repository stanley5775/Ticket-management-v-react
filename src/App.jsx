import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import AuthLogin from './pages/AuthLogin';
import AuthSignup from './pages/AuthSignup';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import AddEditTicket from './pages/AddEditTicket';

export default function App(){
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow bg-slate-50">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth/login" element={<AuthLogin />} />
            <Route path="/auth/signup" element={<AuthSignup />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/tickets/new" element={<AddEditTicket />} />
            <Route path="/tickets/edit/:id" element={<AddEditTicket />} />

            <Route path="*" element={<Landing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

