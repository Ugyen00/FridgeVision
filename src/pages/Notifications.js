import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { HiArrowLeft } from "react-icons/hi2";

const Notifications = () => {
    const navigate = useNavigate(); // Create a navigate instance
    const [lowStockItems, setLowStockItems] = useState([]);

    useEffect(() => {
        // You can fetch these items from an API
        const items = [
            { name: 'Milk', quantity: '1 gallon', daysLeft: 4, image: './items/milks.jpg' },
            { name: 'Banana', quantity: '2 bananas', daysLeft: 1, image: './items/banana.jpg' },
            // Add other low stock items here
        ];

        setLowStockItems(items); // Set the items as low stock items
    }, []);

    return (
        <div className="container mx-auto p-6 py-24">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)} // Navigate back on button click
                className="mb-4 text-black rounded-md px-4 py-2 hover:text-gray-400 focus:outline-none"
            >
                <HiArrowLeft className='w-6 h-6' />
            </button>

            {/* Notification Section */}
            <div className="bg-red-100 p-4 rounded-lg flex items-center mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600 mr-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4m0 4h.01M5.932 5.93a10 10 0 1112.137 12.135A10 10 0 015.932 5.93z"
                    />
                </svg>
                <div>
                    <h3 className="text-red-600 font-semibold">Low in Stock</h3>
                    <p className="text-sm text-gray-600">
                        You have {lowStockItems.length} item{lowStockItems.length > 1 ? 's' : ''} that are low in stock. Tap to see the list.
                    </p>
                </div>
            </div>

            {/* Detailed List of Low Stock Items */}
            <h2 className="text-lg font-semibold mb-4">In Your Fridge</h2>
            <div className="space-y-4">
                {lowStockItems.length > 0 ? (
                    lowStockItems.map((item, index) => (
                        <div key={index} className="flex items-center bg-white rounded-lg shadow-lg p-4">
                            <img
                                src={item.image} // Use the image path from the item object
                                alt={item.name}
                                className="w-12 h-12 rounded-full object-cover mr-4"
                            />
                            <div>
                                <h3 className="text-md font-semibold">{item.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {item.quantity}, expires in {item.daysLeft} day{item.daysLeft > 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No items are low in stock.</p>
                )}
            </div>
        </div>
    );
};

export default Notifications;
