import React, { useState } from 'react';

const FridgeAI = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Banana', count: 5, type: 'Fruit', image: './items/banana.jpg' },
        { id: 2, name: 'Bread', count: 1, type: 'Grain', image: './items/bread.jpg' },
        { id: 3, name: 'Eggs', count: 12, type: 'Protein', image: './items/eggs.jpg' },
        { id: 4, name: 'Milk', count: 2, type: 'Dairy', image: './items/milks.jpg' },
        { id: 5, name: 'Potato', count: 4, type: 'Vegetable', image: './items/potato.jpg' },
        { id: 6, name: 'Spinach', count: 1, type: 'Vegetable', image: './items/spinach.jpg' },
        { id: 7, name: 'Tomato', count: 8, type: 'Vegetable', image: './items/tomato.jpg' },
    ]);

    const [filter, setFilter] = useState('All');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Filter items based on the selected filter type
    const filteredItems = filter === 'All' ? items : items.filter(item => item.type === filter);

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
                            <option value="All">All</option>
                            <option value="Fruit">Fruit</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Vegetable">Vegetable</option>
                            <option value="Protein">Protein</option>
                        </select>
                    </div>
                </div>

                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                    {filteredItems.map(item => (
                        <li
                            key={item.id}
                            className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadow-sm border border-transparent transition-all duration-300 hover:scale-105 hover:bg-gray-200 hover:border-gray-400"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-32 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-110"
                            />
                            <div className="text-center transition-opacity duration-300 opacity-100">
                                <span className="block font-semibold">{item.name}</span>
                                <span className="text-gray-500">{item.type}</span>
                                <span className="block font-bold mt-2">{item.count} left</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FridgeAI;
