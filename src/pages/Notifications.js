import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { HiArrowLeft } from "react-icons/hi2";

const Notifications = () => {
    const navigate = useNavigate(); // Create a navigate instance
    const [lowStockItems, setLowStockItems] = useState([]);

    useEffect(() => {
        // Fetch real-time items from the API (same as in FridgeAI)
        const fetchRealTimeItems = async () => {
            try {
                const response = await fetch('https://fridgevision-backend.onrender.com/api/real-time-items');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Filter out items with 0 count (out of stock)
                const zeroStockItems = data.filter(item => item.count === 0);

                const mappedItems = zeroStockItems.map(item => {
                    let category = '';
                    let image = '';

                    // Check which item it is and assign category and image
                    if (item.item === 'Banana') {
                        category = 'Fruit';
                        image = './items/banana.jpg'; // Image for Banana
                    } else if (item.item === 'Tomato') {
                        category = 'Fruit';
                        image = './items/tomato.jpg'; // Image for Tomato
                    } else if (item.item === 'Egg') {
                        category = 'Protein';
                        image = './items/eggs.jpg'; // Image for Eggs
                    } else if (item.item === 'Milk') {
                        category = 'Dairy';
                        image = './items/milks.jpg'; // Image for Milk
                    } else if (item.item === 'Spinach') {
                        category = 'Vegetable';
                        image = './items/spinach.jpg'; // Image for Spinach
                    } else if (item.item === 'Potato') {
                        category = 'Vegetable';
                        image = './items/potato.jpg'; // Image for Potato
                    } else if (item.item === 'Bread') {
                        category = 'All';
                        image = './items/bread.jpg'; // Image for Bread
                    } else {
                        // Default fallback image for any other items
                        category = 'Unknown';
                        image = './items/default.jpg';
                    }

                    return {
                        name: item.item,
                        quantity: `${item.count} left`,
                        image: image,
                        category: category, // Added category for reference
                        daysLeft: 0, // You can add an expiry date if available
                    };
                });

                setLowStockItems(mappedItems); // Set the items as low stock items
            } catch (error) {
                console.error('Error fetching real-time items:', error);
            }
        };

        fetchRealTimeItems(); // Fetch the items when the component mounts
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
                        You have {lowStockItems.length} item{lowStockItems.length > 1 ? 's' : ''} out of stock.
                    </p>
                </div>
            </div>

            {/* Detailed List of Low Stock Items */}
            <h2 className="text-lg font-semibold mb-4">Out of Stock Items</h2>
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
                    <p className="text-gray-500">No items are out of stock.</p>
                )}
            </div>
        </div>
    );
};

export default Notifications;
