import DatabaseSingleton from '../database';

(async () => {
  const database = DatabaseSingleton.getInstance();

  try {
    await database.initialize();
    await database.synchronize(true); // Очистка базы данных
    console.log('База данных очищена');
  } catch (error) {
    console.error('Ошибка при очистке базы данных:', error);
  } finally {
    await database.destroy();
  }
})();
