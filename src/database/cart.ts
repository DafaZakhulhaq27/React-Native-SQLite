import {Cart} from '../models/cart';
import {db} from './utils';

type FormCart = {
  idUser: number;
  idProduct: number;
  quantity: number;
};

// Helper function to retrieve cart details by user and product
const getCartByUserAndProduct = async (
  userId: number,
  productId: number,
): Promise<(FormCart & {id: number}) | null> => {
  const query = `
      SELECT *
      FROM carts
      WHERE id_user = ? AND id_product = ?
    `;

  try {
    const results = await (await db()).executeSql(query, [userId, productId]);
    const rows = results[0].rows;

    if (rows.length > 0) {
      return rows.item(0);
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const updateCart = async (
  id: number,
  newQuantity: number,
): Promise<boolean> => {
  try {
    const updateCartQuery = `
        UPDATE carts
        SET quantity = ?
        WHERE id = ?
      `;

    await (await db()).executeSql(updateCartQuery, [newQuantity, id]);
    return true;
  } catch (error) {
    console.error(error, 'error');
    return false;
  }
};

export const addCart = async (data: FormCart): Promise<boolean> => {
  const {idUser, idProduct, quantity} = data;

  try {
    // Check if the same user and product combination already exists in the cart
    const existingCart = await getCartByUserAndProduct(idUser, idProduct);

    if (existingCart) {
      // If exists, update the quantity
      await updateCart(existingCart.id, existingCart.quantity + quantity);
    } else {
      // If not exists, insert a new row
      const insertCart = `
        INSERT INTO carts (id_user, id_product, quantity)
        VALUES (?, ?, ?)
      `;

      await (await db()).executeSql(insertCart, [idUser, idProduct, quantity]);
    }

    return true;
  } catch (error) {
    console.error(error, 'error');
    return false;
  }
};

export const deleteCart = async (id: number): Promise<boolean> => {
  try {
    // Delete the cart entry with the specified ID
    const deleteCartQuery = `
        DELETE FROM carts
        WHERE id = ?
      `;

    await (await db()).executeSql(deleteCartQuery, [id]);
    return true;
  } catch (error) {
    console.error(error, 'error');
    return false;
  }
};

export const deleteUserCart = async (idUser: number): Promise<boolean> => {
  try {
    // Delete the cart entry with the specified User ID
    const deleteCartQuery = `
          DELETE FROM carts
          WHERE id_user = ?
        `;

    await (await db()).executeSql(deleteCartQuery, [idUser]);
    return true;
  } catch (error) {
    console.error(error, 'error');
    return false;
  }
};

export const getUserCart = async (
  userId: number,
): Promise<{
  status: boolean;
  cart?: Cart[];
}> => {
  const query = `
      SELECT
        c.id,
        c.quantity,
        p.id AS id_product,
        p.title AS title,
        p.price AS price,
        p.description AS description,
        p.category AS category,
        p.image AS image,
        p.rating_rate AS rating_rate,
        p.rating_count AS rating_count
      FROM carts c
      INNER JOIN products p ON c.id_product = p.id
      WHERE c.id_user = ?
    `;

  try {
    const results = await (await db()).executeSql(query, [userId]);
    const rows = results[0].rows;

    const carts: Cart[] = [];

    if (rows.length > 0) {
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          const product = result.rows.item(index);

          carts.push({
            ...product,
            rating: {rate: product.product, count: product.rating_count},
          });
        }
      });
    }

    return {status: true, cart: carts};
  } catch (err) {
    console.log(err, 'err');
    return {status: false};
  }
};
