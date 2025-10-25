import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import RegisterPage from './components/RegisterPage';
import SharedTaskPage from './components/SharedTaskPage';
import Navigatorr from './components/Navigatorr';
import OfflineIndicator from './components/OfflineIndicator';

export default function App() {
    const [route, setRoute] = useState(window.location.pathname);

    useEffect(() => {
        const handleRouteChange = () => {
            const token = localStorage.getItem('jwtToken');
            const path = window.location.pathname;

            if (path.startsWith('/share/task/')) {
                setRoute(path);
            } else if (!token && path !== '/register') {
                window.history.pushState({}, '', '/login');
                setRoute('/login');
            } else {
                setRoute(path);
            }
        };

        window.addEventListener('popstate', handleRouteChange);
        handleRouteChange();

        return () => window.removeEventListener('popstate', handleRouteChange);
    }, []);

    const navigate = (path) => {
        if (path === '/login') localStorage.removeItem('jwtToken');
        window.history.pushState({}, '', path);
        setRoute(path);
    };

    const renderPage = () => {
        if (route.startsWith('/share/task/')) {
            const taskId = route.split('/')[3];
            return <SharedTaskPage taskId={taskId} />;
        }

        switch (route) {
            case '/dashboard':
                return <Dashboard />;
            case '/profile':
                return <ProfilePage />;
            case '/register':
                return <RegisterPage setRoute={navigate} />;
            case '/login':
            default:
                return <LoginPage setRoute={navigate} />;
        }
    };

    const showNavBar = !['/login', '/register'].includes(route) && !route.startsWith('/share/task/');

    return (
        <div
            className="min-h-screen bg-gray-100 text-gray-800 font-sans transition-colors duration-300"
            style={{ fontFamily: "'Nunito', sans-serif" }}
        >
            <OfflineIndicator />
            {showNavBar && <Navigatorr setRoute={navigate} />}
            <main className="max-w-6xl mx-auto px-4 py-6">{renderPage()}</main>
        </div>
    );
}
