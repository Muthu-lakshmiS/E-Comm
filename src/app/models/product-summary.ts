import { CategorySummary, VarientProduct } from "./product";
import { DisplayText } from "./product-category";

export interface ProductSummary {
    name:        DisplayText;
    description: DisplayText;
    images:      string[];
    varient:     VarientProduct;
    category:    CategorySummary;
    countryCode: string;
    _id:         string;
}



