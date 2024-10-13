import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-green-500 p-4 fixed top-0 left-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left: Logo or Title */}
                <div className="text-white text-xl font-bold">
                    <Link to="/"><img src='./logo.png' width={80} className='mt-2' /></Link>
                </div>

                {/* Right: Notification and Profile */}
                <div className="flex items-center space-x-4">
                    {/* Notification Icon */}
                    <div className="relative">
                        <Link to="/notifications" className="text-white focus:outline-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 17h5l-1.405-1.405C18.62 15.067 18 13.79 18 12.5V10c0-3.333-2-5-5-5S8 6.667 8 10v2.5c0 1.29-.62 2.567-1.595 3.095L5 17h5m5 0v1a3 3 0 01-6 0v-1m6 0H9"
                                />
                            </svg>
                        </Link>
                        {/* Notification Badge */}
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                            3
                        </span>
                    </div>

                    {/* Profile Icon */}
                    <div>
                        <Link to="/profile" className="text-white focus:outline-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.121 17.804A9.953 9.953 0 0112 15c2.116 0 4.073.654 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
