const categories = ['Электроника', 'Одежда', 'Книги', 'Дом', 'Спорт'];
const productsByCategory = {
  'Электроника': ['Ноутбук', 'Телефон', 'Планшет', 'Наушники', 'Зарядка'],
  'Одежда': ['Футболка', 'Джинсы', 'Куртка', 'Кроссовки', 'Шапка'],
  'Книги': ['Роман', 'Детектив', 'Фантастика', 'Учебник', 'Комикс'],
  'Дом': ['Стул', 'Стол', 'Лампа', 'Ковер', 'Полка'],
  'Спорт': ['Мяч', 'Гантели', 'Скакалка', 'Велосипед', 'Ракетка']
};

function getRandomDate(daysAgo = 30) {
  const now = new Date();
  const past = new Date(now);
  past.setDate(now.getDate() - daysAgo);
  const randomTimestamp = past.getTime() + Math.random() * (now.getTime() - past.getTime());
  const date = new Date(randomTimestamp);
  return date.toISOString().split('T')[0];
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMockData(count = 50) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const category = getRandomItem(categories);
    const product = getRandomItem(productsByCategory[category]);
    const amount = Math.round((Math.random() * 5000 + 200) * 100) / 100;
    const quantity = Math.floor(Math.random() * 5) + 1;
    data.push({
      date: getRandomDate(30),
      product,
      category,
      amount,
      quantity,
    });
  }
  data.sort((a, b) => new Date(b.date) - new Date(a.date));
  return data;
}

export default generateMockData;