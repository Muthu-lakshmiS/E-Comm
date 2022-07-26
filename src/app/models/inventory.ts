import { Brand, ProductSummary } from './product';
import { MetaData } from './product-category';
import { DataRef } from './purchase';

export interface Inventory {
  metaData: MetaData;
  product: ProductSummary;
  currentStock: number;
  expiryTime: string;
  brand: Brand;
  warehouse: DataRef;
  countryCode: string;
  _id: string;
}
