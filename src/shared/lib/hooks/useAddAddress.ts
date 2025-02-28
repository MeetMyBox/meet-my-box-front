import { axiosInstance } from "./useInterceptor";

interface IAddressData {
  type: "receiver" | "sender";
  lastName: string;
  firstName: string;
  lastNameLatin: string;
  firstNameLatin: string;
  phoneNumber: string;
  postalCode: string;
  country: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  housing: string;
  intercomName: string;
}

export async function useAddAddress(data: IAddressData): Promise<string> {
  try {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    await axiosInstance.post("/api/address/add", data, {
      headers: {
        Authorization: `Bearer ${userData.access}`,
      },
    });

    return "Success";
  } catch (error: unknown | any) {
    console.error("Failed to add address:", error);
    if (error.response) {
      return error.response.data.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}
