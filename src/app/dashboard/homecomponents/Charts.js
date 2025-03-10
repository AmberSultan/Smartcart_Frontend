import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#198754', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const Charts = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4001';

    const [data, setData] = useState([]);
    const [mealCategories, setMealCategories] = useState([]);

    useEffect(() => {
        // Fetch dish data for the pie chart
        fetch(`${BASE_URL}/dishName/dishes`)
            .then(response => response.json())
            .then(apiData => {
                const categoryCounts = apiData.reduce((acc, dish) => {
                    const categoryName = dish.categoryId.categoryName;
                    acc[categoryName] = (acc[categoryName] || 0) + 1;
                    return acc;
                }, {});

                const chartData = Object.keys(categoryCounts).map(categoryName => ({
                    name: categoryName,
                    value: categoryCounts[categoryName]
                }));

                setData(chartData);
            })
            .catch(error => console.error('Error fetching dish data:', error));

        // Fetch meal categories
        fetch(`${BASE_URL}/mealcategory/category`)
            .then(response => response.json())
            .then(responseData => {
                // Extract the `categories` array from the response
                setMealCategories(responseData.categories);
            })
            .catch(error => console.error('Error fetching meal categories:', error));
    }, []);

    return (
        <div>
            <div className="row ms-5">
                <div className="col-md-5 me-5 borderchart1 meal-categories-container">
                    <h5 className='mt-3 fw-bold text-success  meal-categories-heading'>Dishes by Category</h5>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="col-md-5 borderchart1 meal-categories-container">
                    <h5 className='mt-3 fw-bold text-success meal-categories-heading'>Meal Categories</h5>
                    <p>Keep refining the meal list here</p>
                    <ul className="meal-categories-list">
                        {mealCategories.map((category) => (
                            <li key={category._id} className="meal-categories-list-item">
                                <span>{category.categoryName}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Charts;