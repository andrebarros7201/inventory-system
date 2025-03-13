import { Store } from "@/types/Store";

export default interface StoreSlice {
  stores: Store[];
  loading: boolean;
  error: null | string;
}
