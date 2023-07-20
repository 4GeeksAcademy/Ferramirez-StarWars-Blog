import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

export const PrivatePage = () => {
    const navigate = useNavigate();
    const { actions, store } = useContext(Context);

    // Check authentication status on component mount
    useEffect(() => {
        // If not authenticated, redirect to login page
        if (!store.isAuthenticated) {
            navigate('/login');
        }
    }, [store.isAuthenticated, navigate]);

    const handleLogout = () => {
        actions.logout();
        navigate('/login');
    };

    return (
        <>
            <h1>Private Window - Welcome!</h1>
            <button onClick={handleLogout}>Log Out</button>
        </>
    );
};
