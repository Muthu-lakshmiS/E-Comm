import { DisplayText, MetaData } from './product-category';

export interface Product {
  metaData: MetaData;
  name: DisplayText;
  description: DisplayText;
  images: string[];
  varients: VarientProduct[];
  keywords: string[];
  brand: Brand;
  category: CategorySummary;
  defaultVarientCode: string;
  marketingInfo: MarketingInfo;
  type: string;
  _id: string;
  countryCode: string;
}

export interface ProductSummary {
  _id: string;
  name: DisplayText;
  description: DisplayText;
  images: string[];
  varient: VarientProduct;
  category: CategorySummary;
  countryCode: string;
}

export interface Brand {
  id: string;
  name: string;
  logoId: string;
}
export interface CategorySummary {
  id: string;
  name: DisplayText;
  logoId: string;
  subCategory: boolean;
  parentCategoryId: string;
}

export interface MarketingInfo {
  socialMediaImage: string;
  socialMediaTitle: string;
  socialMediaDescription: string;
}
export interface CartConstraint {
  minimumOrder: number;
  maximumOrder: number;
}

export interface VarientProduct {
  varientCode: string;
  weight: number;
  unit: string;
  currentStock: number;
  price: PriceInfo;
  dimension: Dimension;
  applyExtraShipping: boolean;
  skuId: string;
  constraint: CartConstraint;
}

export interface Dimension {
  width: number;
  height: number;
  length: number;
}

export interface PriceInfo {
  actualPrice: number;
  offerPrice: number;
  memberCoin: number;
  primeMemberCoin: number;
  goldMemberCoin: number;
  silverMemberCoin: number;
}
