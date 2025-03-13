import Store from "@/types/Store";

export default interface StoreSlice {
  userStores: Store[];
  loading: boolean;
  error: null | string;
}
