import React, { useState } from 'react';

function AddSaleForm({ onAdd, categories }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    product: '',
    category: categories.length > 0 ? categories[0] : '',
    amount: '',
    quantity: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.product.trim()) {
      alert('Введите название товара');
      return;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Введите корректную сумму');
      return;
    }
    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      alert('Введите корректное количество');
      return;
    }

    // Отправляем объект без id – сервер создаст его сам
    const newSale = {
      date: formData.date,
      product: formData.product.trim(),
      category: formData.category,
      amount: parseFloat(formData.amount),
      quantity: parseInt(formData.quantity),
    };
    onAdd(newSale);
    // Сбрасываем поля, но оставляем дату и категорию
    setFormData(prev => ({
      ...prev,
      product: '',
      amount: '',
      quantity: 1,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-wrap gap-4 items-end">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Дата</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Товар</label>
        <input
          type="text"
          name="product"
          value={formData.product}
          onChange={handleChange}
          placeholder="Например: Ноутбук"
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Категория</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.length === 0 ? (
            <option value="">Загрузка...</option>
          ) : (
            categories.map(cat => <option key={cat} value={cat}>{cat}</option>)
          )}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Сумма (₽)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          step="0.01"
          min="0"
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Количество</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          step="1"
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        ➕ Добавить
      </button>
    </form>
  );
}

export default AddSaleForm;