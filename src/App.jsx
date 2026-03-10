import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50 text-slate-800">
                <div className="flex flex-col items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <h2 className="text-xl font-semibold">Loading...</h2>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                {/* Redirect to dashboard if logged in, otherwise to login */}
                <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />

                {/* Public routes */}
                <Route
                    path="/login"
                    element={user ? <Navigate to="/dashboard" replace /> : <Login />}
                />
                <Route
                    path="/signup"
                    element={user ? <Navigate to="/dashboard" replace /> : <Signup />}
                />

                {/* Protected routes */}
                <Route
                    path="/dashboard"
                    element={user ? <Dashboard user={user} /> : <Navigate to="/login" replace />}
                />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
