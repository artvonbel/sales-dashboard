import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar,
  PieChart, Pie, Cell,
  ResponsiveContainer
} from 'recharts';
import { format, parseISO } from 'date-fns';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

function Charts({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 text-center py-8">Нет данных для отображения графиков.</p>;
  }

  const dailyData = data.reduce((acc, item) => {
    const date = item.date;
    if (!acc[date]) acc[date] = { total: 0, count: 0 };
    acc[date].total += item.amount;
    acc[date].count += 1;
    return acc;
  }, {});
  const dailyArray = Object.keys(dailyData).map(date => ({
    date: format(parseISO(date), 'dd.MM'),
    total: Math.round(dailyData[date].total * 100) / 100,
    count: dailyData[date].count,
  })).sort((a, b) => {
    return new Date(a.date.split('.').reverse().join('-')) - new Date(b.date.split('.').reverse().join('-'));
  });

  const categoryData = data.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = 0;
    acc[item.category] += item.amount;
    return acc;
  }, {});
  const categoryArray = Object.keys(categoryData).map(cat => ({
    category: cat,
    total: Math.round(categoryData[cat] * 100) / 100,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Продажи по дням (сумма)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={dailyArray}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip formatter={(value) => `${value} ₽`} />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8884d8" name="Сумма, ₽" animationDuration={800} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Продажи по дням (количество)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={dailyArray}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#82ca9d" name="Количество" animationDuration={800} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Продажи по категориям (сумма)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={categoryArray}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="category" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip formatter={(value) => `${value} ₽`} />
            <Legend />
            <Bar dataKey="total" fill="#82ca9d" name="Сумма, ₽" animationDuration={800} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Доля категорий</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={categoryArray}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              label
              animationDuration={800}
            >
              {categoryArray.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} ₽`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;