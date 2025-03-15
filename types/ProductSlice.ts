import Product from "./Product";

export default interface ProductSlice {
  products: Product[];
  loading: boolean;
}
