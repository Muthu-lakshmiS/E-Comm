import { DisplayText, MetaData } from './product-category';

export interface ProductBrand {
  metaData: MetaData;
  name: string;
  logoId: string;
  description: DisplayText;
  active: boolean;
  _id: string;
}
