import { CartConstraint, PriceInfo, ProductSummary } from './product';
import { MetaData } from './product-category';

export interface DealProduct {
  metaData: MetaData;
  type: string;
  product: ProductSummary;
  dealPrice: PriceInfo;
  imageId: string;
  ruleConfig: RuleConfig;
  businessId: string;
  _id: string;
  active: boolean;
  constraint: CartConstraint;
}

export interface RuleConfig {
  willExpireAt: string;
  willStartAt: string;
  minCartAmount: number;
  onlyForPrimeMember: boolean;
  onlyForSilverMember: boolean;
  onlyForGoldenMember: boolean;
  forWeekDays: number[];
}
