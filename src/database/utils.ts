import {useQuery} from '@tanstack/react-query';
import {openDatabase, enablePromise} from 'react-native-sqlite-storage';

export const db = () => {
  enablePromise(true);

  return openDatabase({
    name: 'Bababos',
    location: 'default',
  });
};
export const initDb = async () => {
  // Create users table
  const queryCreateUsers = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  // Insert default user if not already exists
  const queryInsertUsers = `
    INSERT INTO users (email, password)
    SELECT 'test@gmail.com' AS email, 'password' AS password
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'test@gmail.com')
    UNION
    SELECT 'test2@gmail.com' AS email, 'password' AS password
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'test2@gmail.com');
  `;

  // Create products table
  const queryCreateProducts = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      rating_rate REAL,
      rating_count INTEGER
    );
  `;

  // Create cart table
  const queryCreateCart = `
    CREATE TABLE IF NOT EXISTS carts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_user INTEGER,
      id_product INTEGER,
      quantity INTEGER
    );
  `;

  try {
    // Create users table and insert default user if not exists
    await (await db()).executeSql(queryCreateUsers);
    await (await db()).executeSql(queryInsertUsers);

    // Create products table
    await (await db()).executeSql(queryCreateProducts);

    // Create cart table
    await (await db()).executeSql(queryCreateCart);
    return true;
  } catch (err) {
    console.log(err, 'err');
    return false;
  }
};

export const useInitDB = () =>
  useQuery<boolean>({
    queryKey: ['initDB'],
    queryFn: initDb,
  });
