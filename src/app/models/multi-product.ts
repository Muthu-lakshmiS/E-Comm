import { CartConstraint, PriceInfo, ProductSummary } from './product';
import { DisplayText, MetaData } from './product-category';

export interface MultiProduct {
  metaData: MetaData;
  name: DisplayText;
  products: ProductSummary[];
  displayImageId: string;
  price: PriceInfo;
  active: boolean;
  type: string;
  businessId: string;
  _id: string;
  constraint:CartConstraint;
}
