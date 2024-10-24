import DatabaseSingleton from '../database';
import { User } from '../models/User';

(async () => {
  const database = DatabaseSingleton.getInstance();

  try {
    await database.initialize();
    const userRepository = database.getRepository(User);
    const users = await userRepository.find();
    console.log('Пользователи:', users);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  } finally {
    await database.destroy();
  }
})();
