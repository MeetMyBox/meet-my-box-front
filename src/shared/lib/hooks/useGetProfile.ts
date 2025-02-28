import { useEffect, useState } from "react";
import { axiosInstance } from "./useInterceptor";

// Custom hook to get the profile
export function useGetProfile() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axiosInstance.get("/api/user/get-profile");
        // console.log("Profile got successfully:", response.data);
        setResult(response.data.profile);
      } catch (error: unknown | any) {
        console.error("Failed to get profile:", error);
        setError(error.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  return { result, loading, error };
}
