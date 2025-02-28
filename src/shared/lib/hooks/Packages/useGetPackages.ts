import type { PackageProps } from "@entities/Packages";
import { axiosInstance } from "../useInterceptor";

export async function useGetPackages(): Promise<PackageProps[]> {
  try {
    // const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    const response = await axiosInstance.get("/api/packages/get-packages");

    // console.log("Packages got successfully:", response.data);

    return response.data.packages;
  } catch (error: unknown | any) {
    console.error("Failed to get packages:", error);
    return [];
  }
}
