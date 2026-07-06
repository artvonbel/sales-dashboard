// src/utils/exportCSV.js

export function exportToCSV(data, filename = 'sales_export.csv') {
  if (!data || data.length === 0) {
    alert('Нет данных для экспорта.');
    return;
  }

  // Заголовки (все ключи, кроме id – можно исключить)
  const headers = ['date', 'product', 'category', 'amount', 'quantity'];
  const headerRow = headers.join(',');

  // Строки данных
  const rows = data.map(item => 
    headers.map(key => {
      let value = item[key];
      if (typeof value === 'string' && value.includes(',')) {
        value = `"${value}"`; // экранирование запятых
      }
      return value;
    }).join(',')
  );

  const csvContent = [headerRow, ...rows].join('\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' }); // BOM для Excel
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}