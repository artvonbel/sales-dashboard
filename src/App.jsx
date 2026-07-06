import React, { useState, useEffect } from 'react';
import { exportToCSV } from './utils/exportCSV';
import Filters from './components/Filters';
import Charts from './components/Charts';
import SalesTable from './components/SalesTable';
import AddSaleForm from './components/AddSaleForm';
import { useTheme } from './context/ThemeContext';
import toast, { Toaster } from 'react-hot-toast';
import { getSales, addSale, deleteSale } from './services/salesService';
import generateMockData from './utils/generateMockData';

function App() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    category: '',
    search: '',
    sumMin: '',
    sumMax: '',
  });

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Загрузка данных с сервера
  useEffect(() => {
    const loadSales = async () => {
      try {
        let data = await getSales();
        if (data.length === 0) {
          // Если база пуста – создаём мок-данные
          const mockData = generateMockData(50);
          // Отправляем все записи параллельно
          await Promise.all(mockData.map(item => addSale(item)));
          data = await getSales(); // перезагружаем
        }
        setSales(data);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        toast.error('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };
    loadSales();
  }, []);

  // Добавление новой продажи
  const handleAdd = async (newSale) => {
    try {
      const added = await addSale(newSale);
      setSales(prev => [added, ...prev]);
      toast.success(`Добавлена продажа: ${newSale.product}`);
    } catch (error) {
      console.error('Ошибка добавления:', error);
      toast.error('Не удалось добавить запись');
    }
  };

  // Удаление
  const handleDelete = async (id) => {
    const itemToDelete = sales.find(item => item.id === id);
    if (!itemToDelete) return;
    if (!window.confirm(`Удалить запись "${itemToDelete.product}" (${itemToDelete.amount} ₽)?`)) return;
    try {
      await deleteSale(id);
      setSales(prev => prev.filter(item => item.id !== id));
      toast.success(`Запись "${itemToDelete.product}" удалена`);
    } catch (error) {
      console.error('Ошибка удаления:', error);
      toast.error('Не удалось удалить запись');
    }
  };

  // Остальная логика (фильтрация, сортировка, пагинация)
  const categories = [...new Set(sales.map((item) => item.category))];

  const filteredSales = sales.filter((item) => {
    if (filters.dateFrom && item.date < filters.dateFrom) return false;
    if (filters.dateTo && item.date > filters.dateTo) return false;
    if (filters.category && item.category !== filters.category) return false;
    if (filters.search && !item.product.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.sumMin && item.amount < parseFloat(filters.sumMin)) return false;
    if (filters.sumMax && item.amount > parseFloat(filters.sumMax)) return false;
    return true;
  });

  const sortedData = [...filteredSales];
  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIdx, startIdx + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortConfig]);

  useEffect(() => {
    if (paginatedData.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [paginatedData, currentPage]);

  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  const handlePageChange = (page) => setCurrentPage(page);

  const handleExport = () => {
    if (filteredSales.length === 0) {
      toast.error('Нет данных для экспорта');
      return;
    }
    exportToCSV(filteredSales, 'sales_export.csv');
    toast.success(`Экспортировано ${filteredSales.length} записей`);
  };

  const totalAmount = filteredSales.reduce((sum, item) => sum + item.amount, 0);
  const averageCheck = filteredSales.length > 0 ? totalAmount / filteredSales.length : 0;
  const totalOrders = filteredSales.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300 text-xl">Загрузка данных...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme === 'dark' ? '#1f2937' : '#fff',
            color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
          },
        }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            📊 Дашборд продаж
          </h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'light' ? '🌙 Ночная' : '☀️ Дневная'}
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Всего записей: {sales.length} | Отфильтровано: {filteredSales.length}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">Общая сумма</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {totalAmount.toFixed(2)} ₽
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">Средний чек</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {averageCheck.toFixed(2)} ₽
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">Количество заказов</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {totalOrders}
            </p>
          </div>
        </div>

        <Filters filters={filters} onFilterChange={handleFilterChange} categories={categories} />
        <Charts data={filteredSales} />

        <div className="mt-6">
          <SalesTable
            data={paginatedData}
            onDelete={handleDelete}
            sortConfig={sortConfig}
            onSort={handleSort}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        <button
          onClick={handleExport}
          className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
        >
          📥 Экспорт в CSV (отфильтрованные)
        </button>

        <AddSaleForm onAdd={handleAdd} categories={categories} />
      </div>
    </div>
  );
}

export default App;