import {useQuery} from '@tanstack/react-query';
import {Product} from '../models/product';
import {db} from './utils';

export const addProduct = async (data: Product): Promise<boolean> => {
  const {title, price, description, category, image, rating} = data;

  try {
    const insertProduct = `
        INSERT INTO products (title, price, description, category, image, rating_rate, rating_count)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

    const results = await (
      await db()
    ).executeSql(insertProduct, [
      title,
      price,
      description,
      category,
      image,
      rating.rate,
      rating.count,
    ]);

    if (results[0].rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const getProduct = async (): Promise<{
  status: boolean;
  products?: Product[];
}> => {
  try {
    const getAllProduct = `
      SELECT *
      FROM products;
    `;

    const results = await (await db()).executeSql(getAllProduct);
    const rows = results[0].rows;

    if (rows.length > 0) {
      const productsDb: Product[] = [];

      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          const product = result.rows.item(index);

          productsDb.push({
            ...product,
            rating: {rate: product.product, count: product.rating_count},
          });
        }
      });

      return {status: true, products: productsDb};
    } else {
      const res = await fetch('https://fakestoreapi.com/products/');
      const productApi = (await res.json()) as Product[];

      if (productApi && productApi.length) {
        productApi.forEach(async _ => {
          await addProduct(_);
        });

        return {status: true, products: productApi};
      }

      return {status: false};
    }
  } catch (error) {
    return {status: false};
  }
};

export const useGetProducts = () =>
  useQuery<{status: boolean; products?: Product[]}>({
    queryKey: ['products'],
    queryFn: getProduct,
  });
