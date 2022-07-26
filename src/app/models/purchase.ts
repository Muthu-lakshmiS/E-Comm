import {
    Brand,
    ProductSummary
} from './product';
import { MetaData } from './product-category';

export interface Purchase {
  metaData: MetaData;
  purchaseFrom: PurchaseFrom;
  documents: string[];
  brand: Brand;
  product: ProductSummary;
  amountPaid: number;
  amountPending: number;
  amountTotal: number;
  comment: number;
  billingId: string;
  productCodeFromVendor: string;
  alert: PurchaseAlert;
  consignmentDetails: ConsignmentDetails;
  warehouse: DataRef;
  countrycode: string;
  _id: string;
}

export interface PurchaseAlert {
  whenStockIsLesser: number;
  beforeDaysOfExpiry: number;
}

export interface ConsignmentDetails {
  totalStock: number;
  expiryTime: string;
}

export interface PurchaseFrom {
  countryCode: string;
  name: string;
  registrationId: string;
  contactNumber: string;
  email: string;
  mailAddress: string;
}

export interface DataRef {
  name: string;
  _id: string;
}
