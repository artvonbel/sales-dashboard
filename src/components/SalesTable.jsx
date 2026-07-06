import React from 'react';

function SalesTable({
  data,
  onDelete,
  sortConfig,
  onSort,
  currentPage,
  totalPages,
  onPageChange
}) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400 text-center py-4">Нет записей для отображения.</p>;
  }

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const headerClass = "px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors select-none border-b border-gray-200 dark:border-gray-600";

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });
    return rangeWithDots;
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className={headerClass} onClick={() => onSort('date')}>
              Дата {getSortIndicator('date')}
            </th>
            <th className={headerClass} onClick={() => onSort('product')}>
              Товар {getSortIndicator('product')}
            </th>
            <th className={headerClass} onClick={() => onSort('category')}>
              Категория {getSortIndicator('category')}
            </th>
            <th className={headerClass} onClick={() => onSort('amount')}>
              Сумма (₽) {getSortIndicator('amount')}
            </th>
            <th className={headerClass} onClick={() => onSort('quantity')}>
              Количество {getSortIndicator('quantity')}
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
              Действия
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`table-row-animate border-b border-gray-200 dark:border-gray-700 
                ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'} 
                hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-colors duration-150`}
            >
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{item.date}</td>
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{item.product}</td>
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{item.category}</td>
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 text-right">{item.amount.toFixed(2)}</td>
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 text-center">{item.quantity}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => onDelete(item.id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 mt-4 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
          >
            Назад
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={`px-3 py-1 border rounded min-w-[2.2rem] text-center transition-colors ${
                page === currentPage
                  ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                  : page === '...'
                  ? 'border-transparent cursor-default text-gray-500 dark:text-gray-400'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
          >
            Вперёд
          </button>
        </div>
      )}
    </div>
  );
}

export default SalesTable;