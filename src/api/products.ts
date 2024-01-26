import {useQuery} from '@tanstack/react-query';
import {Product} from '../models/product';

export const useGetProducts = () =>
  useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('https://fakestoreapi.com/products/');

      return res.json();
    },
  });
