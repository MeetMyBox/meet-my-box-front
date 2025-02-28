import { axiosInstance } from "./useInterceptor";
import type { ApplicationProps } from "@features/ApplicationCard";

export async function useGetApplications(): Promise<ApplicationProps[]> {
  try {
    const response = await axiosInstance.get("/api/user/admin/applications");

    return response.data.applications;
  } catch (error: unknown | any) {
    console.error("Failed to get applications:", error);
    if (error.response) {
      return [];
    } else {
      return [];
    }
  }
}
