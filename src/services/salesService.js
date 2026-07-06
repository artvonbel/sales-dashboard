// src/services/salesService.js
import axios from 'axios';

// Если переменная не задана – используем локальный адрес (для разработки)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/sales';

export const getSales = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addSale = async (sale) => {
  const response = await axios.post(API_URL, sale);
  return response.data;
};

export const deleteSale = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};