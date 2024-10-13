import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ProfilePage = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const user = {
        Owner: 'Ugyen Dendup',
        FridgeID: "1001"
    };

    const items = [
        { id: 1, name: 'Banana', count: 5, type: 'Fruit', image: './items/banana.jpg' },
        { id: 2, name: 'Bread', count: 1, type: 'Grain', image: './items/bread.jpg' },
        { id: 3, name: 'Eggs', count: 12, type: 'Protein', image: './items/eggs.jpg' },
        { id: 4, name: 'Milk', count: 2, type: 'Dairy', image: './items/milk.jpg' },
        { id: 5, name: 'Potato', count: 4, type: 'Vegetable', image: './items/potato.jpg' },
        { id: 6, name: 'Spinach', count: 1, type: 'Vegetable', image: './items/spinach.jpg' },
        { id: 7, name: 'Tomato', count: 8, type: 'Vegetable', image: './items/tomato.jpg' },
    ];

    // Generate data for Pie Chart (Item Types)
    const typeCounts = items.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + item.count;
        return acc;
    }, {});

    const typeData = {
        labels: Object.keys(typeCounts),
        datasets: [
            {
                label: 'Item Types',
                data: Object.values(typeCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Generate data for Bar Chart (Individual Items)
    const itemData = {
        labels: items.map(item => item.name),
        datasets: [
            {
                label: 'Count of Individual Items',
                data: items.map(item => item.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="container mx-auto p-6 py-24">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)} // Navigate back on button click
                className="mb-4 text-black rounded-md px-4 py-2 hover:text-gray-400 focus:outline-none"
            >
                <HiArrowLeft className='w-6 h-6' />
            </button>
            {/* User Information */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">User Information</h2>
                <p><strong>Owner:</strong> {user.Owner}</p>
                <p><strong>Fridge ID:</strong> {user.FridgeID}</p>
            </div>

            {/* Flex Container for Charts */}
            <div className="flex flex-col md:flex-row justify-between">
                {/* Pie Chart Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex-1 md:mr-2">
                    <h2 className="text-xl font-semibold mb-4">Item Types Distribution</h2>
                    <Pie data={typeData} options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Distribution of Item Types',
                            },
                        },
                    }} />
                </div>

                {/* Bar Chart Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex-1 md:ml-2">
                    <h2 className="text-xl font-semibold mb-4">Individual Item Counts</h2>
                    <Bar data={itemData} options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Count of Individual Items',
                            },
                        },
                    }} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
