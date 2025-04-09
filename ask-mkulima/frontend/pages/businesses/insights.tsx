import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';

const Insights = () => {
  const [trends, setTrends] = useState([]);
  const [hotspots, setHotspots] = useState([]);
  const [priceForecasts, setPriceForecasts] = useState([]);

  useEffect(() => {
    // Simulate fetching from API
    const fetchData = async () => {
      setTrends([
        { product: 'Tomatoes', trend: 'increasing', change: 15 },
        { product: 'Maize', trend: 'decreasing', change: -8 },
        { product: 'Onions', trend: 'increasing', change: 10 },
      ]);

      setHotspots([
        { location: 'Nairobi', demandScore: 90 },
        { location: 'Mombasa', demandScore: 75 },
        { location: 'Kisumu', demandScore: 60 },
      ]);

      setPriceForecasts([
        { product: 'Tomatoes', currentPrice: 80, predictedPrice: 95 },
        { product: 'Maize', currentPrice: 50, predictedPrice: 45 },
        { product: 'Onions', currentPrice: 70, predictedPrice: 78 },
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">AI-Powered Insights</h2>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-2">📈 Supply Trends</h3>
        <ul className="list-disc ml-6">
          {trends.map((item, index) => (
            <li key={index} className={item.trend === 'increasing' ? 'text-green-600' : 'text-red-600'}>
              {item.product}: {item.trend} ({item.change > 0 ? '+' : ''}{item.change}%)
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-2">🔥 Demand Hotspots</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hotspots}>
            <XAxis dataKey="location" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="demandScore" fill="#34A853" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">💰 Price Forecasts</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceForecasts}>
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="currentPrice" stroke="#8884d8" name="Current Price" />
            <Line type="monotone" dataKey="predictedPrice" stroke="#FF9800" name="Predicted Price" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Insights;
