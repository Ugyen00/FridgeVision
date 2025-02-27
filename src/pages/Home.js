import React, { useState, useEffect } from 'react';

const FridgeAI = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const fetchRealTimeItems = async () => {
            try {
                const response = await fetch('https://fridgevision-backend-u8pk.onrender.com/api/real-time-items');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Categorize items manually and assign images
                const mappedItems = data.map(item => {
                    let category = 'Uncategorized'; // Default category
                    let image = './items/default.jpg'; // Default image

                    if (item.item === 'Banana') {
                        category = 'Fruit';
                        image = './items/banana.jpg'; // Image for Banana and Tomato
                    } else if (item.item === 'Tomato') {
                        category = 'Fruit';
                        image = './items/tomato.jpg'; // Image for Egg
                    } else if (item.item === 'Egg') {
                        category = 'Protein';
                        image = './items/eggs.jpg'; // Image for Egg
                    }
                    else if (item.item === 'Milk') {
                        category = 'Dairy';
                        image = './items/milks.jpg'; // Image for Milk
                    } else if (item.item === 'Spinach') {
                        category = 'Vegetable';
                        image = './items/spinach.jpg'; // Image for Milk
                    }
                    else if (item.item === 'Potato') {
                        category = 'Vegetable';
                        image = './items/potato.jpg'; // Image for Potato and Spinach
                    } else if (item.item === 'Bread') {
                        category = 'All';
                        image = './items/bread.jpg'; // Image for Bread
                    }

                    return {
                        ...item,
                        type: category,
                        image: image, // Assign the image based on the item
                    };
                });

                setItems(mappedItems); // Set the items state with mapped data
            } catch (error) {
                console.error('Error fetching real-time items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRealTimeItems();
    }, []);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    // Apply the filter logic
    const filteredItems = items.filter(item => {
        return filter === "All" || item.type === filter;
    });

    // Categorized options
    const categories = ['All', 'Fruit', 'Dairy', 'Vegetable', 'Protein', 'Uncategorized'];

    return (
        <div className="fridge-ai-container p-6 py-24 bg-white">
            <div className="items-list mb-6">
                <div className='flex justify-between items-center mb-6'>
                    <h2 className="text-lg font-semibold mb-4">Items:</h2>
                    <div className="mb-4">
                        <label htmlFor="filter" className="font-semibold mr-2">Filter by Type:</label>
                        <select
                            id="filter"
                            value={filter}
                            onChange={handleFilterChange}
                            className="border rounded p-2"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : filteredItems.length === 0 ? (
                    <p>No items available</p>
                ) : (
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                        {filteredItems.map(item => (
                            <li
                                key={item._id}
                                className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadow-sm border border-transparent transition-all duration-300 hover:scale-105 hover:bg-gray-200 hover:border-gray-400"
                            >
                                <img
                                    src={item.image} // Use the item-specific image
                                    alt={item.item}
                                    className="w-full h-32 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-110"
                                />
                                <div className="text-center transition-opacity duration-300 opacity-100">
                                    <span className="block font-semibold">{item.item}</span>
                                    <span className="text-gray-500">{item.type}</span>
                                    <span className="block font-bold mt-2">{item.count} left</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FridgeAI;
