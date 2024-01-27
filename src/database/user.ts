import {User} from '../models/user';
import {db} from './utils';

export const loginUser = async (
  email: string,
  password: string,
): Promise<{status: boolean; user?: User}> => {
  try {
    const queryCheckUser = `
    SELECT *
    FROM users
    WHERE email = ? AND password = ? ;
  `;

    const results = await (
      await db()
    ).executeSql(queryCheckUser, [email, password]);

    if (results[0].rows.length > 0) {
      const user = results[0].rows.item(0) as User;

      return {status: true, user: user};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.error('Error during login:', error);
    return {status: false};
  }
};
