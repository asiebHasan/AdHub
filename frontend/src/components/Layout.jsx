'use client';

import React, { useState, useEffect, } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { logout } from '../redux/actions/authActions'
import { fetchProfile } from '../redux/actions/profile';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Your Ads', href: '/ads' },
    { name: 'Wallet', href: '#' },
    { name: 'Statistics', href: '#' },
];

function Layout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    // Fetch states from Redux
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const profile = useSelector((state) => state.profile.data);


    useEffect(() => {
        const token = localStorage.getItem('token');

        // Allow the `/register` path without token validation
        if (location.pathname === '/register') {
            return;
        }

        // Validate the token only once
        if (!token || isTokenExpired(token)) {
            dispatch(logout());
            navigate('/login', { replace: true }); // Avoid adding to history stack
        }
    }, [location.pathname, dispatch, navigate]);


    useEffect(() => {
        if (isAuthenticated && !profile) {
            dispatch(fetchProfile());
        }
    }, [isAuthenticated, profile, dispatch]);


    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login')
    }

    const renderProfileName = () => {
        // If the user is not authenticated, show the "Log in" link
        if (!isAuthenticated) return <Link to="/login" className="text-sm/6 font-semibold text-yellow-300 hover:text-yellow-500">Log in &rarr;</Link>;

        // If the user is authenticated and has a first name, show the name
        if (profile?.first_name) {
            return (
                <div>
                    <Button className="text-sm/6 font-semibold text-yellow-300 hover:text-yellow-500">
                        {profile.first_name}
                    </Button>
                    {` |`}
                    <Button onClick={logoutHandler} className="pl-3 text-sm/6 font-semibold text-yellow-300 hover:text-yellow-500">
                        LOGOUT
                    </Button>
                </div>
            );
        }

        // If the profile is still loading, show a "Loading..." message
        return <span className="animate-pulse text-gray-400">Loading...</span>;
    };


    return (
        <div className="bg-white flex flex-col min-h-screen">
            {/* Header */}
            <header className="flex-no-wrap fixed inset-x-0 top-0 z-50">
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-yellow-500 hover:text-yellow-700">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <span className="text-sm/6 font-semibold text-yellow-300 hover:text-yellow-500">
                            {renderProfileName()}
                        </span>
                    </div>
                </nav>

                {/* Mobile menu */}
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt=""
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                    className="h-8 w-auto"
                                />
                            </a>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        {renderProfileName()}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-yellow-300">
                <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
                    <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
                        © 2024 Your Company —
                        <a href="https://twitter.com/" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">
                            @yourcompany
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}

const isTokenExpired = (token) => {
    if (!token) return true;
    const { exp } = jwtDecode(token);

    return Date.now() >= exp * 1000; // `exp` is in seconds, so multiply by 1000
};

export default Layout;
