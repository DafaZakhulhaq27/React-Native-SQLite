import {Product} from './product';

export type Cart = Product & {
  quantity: number;
};
