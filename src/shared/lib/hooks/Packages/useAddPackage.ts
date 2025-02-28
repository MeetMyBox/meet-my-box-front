import type { PackageProps } from "@entities/Packages";
import { axiosInstance } from "../useInterceptor";

export type Item = {
  name: string;
  country: string;
  quantity: number;
  weight: number;
  cost: number;
};

interface IData {
  items: Item[];
  status: "Pending";
}

export async function useAddPackage(data: IData): Promise<PackageProps | null> {
  try {
    // const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    const response = await axiosInstance.post("/api/packages/add", data);

    // console.log("Packages got successfully:", response.data);

    return response.data.package;
  } catch (error: unknown | any) {
    console.error("Failed to get packages:", error);
    if (error.response) {
      return null;
    } else {
      return null;
    }
  }
}
