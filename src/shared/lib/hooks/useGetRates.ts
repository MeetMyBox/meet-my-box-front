import { axiosInstance } from "./useInterceptor";

export async function useGetRates(data: any): Promise<any> {
  try {
    const response = await axiosInstance.post("/api/rates/get-rates", data);

    return response.data.rates;
  } catch (error: unknown | any) {
    if (error.response) {
      return "Error";
    } else {
      return "Error";
    }
  }
}
