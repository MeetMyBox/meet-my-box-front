import type { IExtendedAddress } from "src/types/adress-types";
import { axiosInstance } from "./useInterceptor";

export async function useGetAddresses(): Promise<IExtendedAddress[]> {
  try {
    const response = await axiosInstance.get("api/address/get-addresses");

    return response.data.addresses;
  } catch (error: unknown | any) {
    console.error("Failed to get addresses:", error);
    if (error.response) {
      return [];
    } else {
      return [];
    }
  }
}
