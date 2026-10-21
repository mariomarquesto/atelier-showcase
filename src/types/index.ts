export type ProductCategory = "rings" | "watches" | "straps";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  spec: string;
  price: string;
  image: string;
  externalCheckoutUrl: string;
  description: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
