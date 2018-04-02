const db = 'PINBOARD_DB';

export const getAll = () =>
  new Promise((resolve, reject) => {
    try {
      const parsedDb = JSON.parse(localStorage.getItem(db));

      resolve(parsedDb || []);
    } catch (err) {
      reject(new Error('Ошибка при чтении БД из local storage.'));
    }
  });

export const add = item =>
  new Promise((resolve, reject) => {
    const data = JSON.parse(localStorage.getItem(db)) || [];
    const maxId = data.length ? data[0].id : 0;
    const newItem = { id: maxId + 1, ...item };
    const updatedData = [newItem, ...data];

    try {
      localStorage.setItem(db, JSON.stringify(updatedData));
      resolve(newItem);
    } catch (err) {
      reject(new Error('Ошибка при добавлении в local storage. Скорее всего, исчерпан лимит по памяти.'));
    }
  });

export const remove = itemId =>
  new Promise((resolve, reject) => {
    try {
      const data = JSON.parse(localStorage.getItem(db)) || [];
      const updatedData = data.filter(({ id }) => id !== itemId);

      localStorage.setItem(db, JSON.stringify(updatedData));
      resolve(itemId);
    } catch (err) {
      reject(new Error('Ошибка при чтении БД из local storage.'));
    }
  });
