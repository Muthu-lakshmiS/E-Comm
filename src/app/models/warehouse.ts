import { MetaData } from './product-category';
import { DataRef } from './purchase';

export interface Warehouse {
  metaData: MetaData;
  address: Address;
  manager: DataRef;
  countryCode: string;
  _id: string;
}

export interface Address {
  line1: string;
  line2: string;
  landMark: string;
  zipCode: string;
  city: string;
  country: string;
  localArea: string;
  addressType: string;
  geoAddress: GeoAddress;
  phoneNumber: string;
  directionComment: string;
}

export interface GeoAddress {
  type: string;
  coordinates: number[];
}
