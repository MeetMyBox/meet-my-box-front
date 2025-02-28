import { axiosInstance } from "./useInterceptor";

export async function useCreatePayment(): Promise<any> {
  try {
    // Step 1: Retrieve the packageId from localStorage
    const packageId = localStorage.getItem("packageId");
    if (!packageId) {
      return "Package ID not found in localStorage";
    }

    // Parse the packageData from localStorage
    // const parsedPackage = JSON.parse(packageId);
    const price = localStorage.getItem("priceData");

    // Step 4: Send a POST request to create a new payment order with the calculated amount
    if (price !== null && price !== undefined) {
      const response = await axiosInstance.post("/api/user/payment/create", {
        amount: parseFloat(price.replace(/[^0-9.]/g, "")), // Pass the total amount in the request body
      });
      console.log(
        "Worked",
        response.data.result.client_secret,
        response.data.result.amount
      );

      return {
        client_secret: response.data.result.client_secret,
        amount: response.data.result.amount / 100,
      }; // Return the response from the backend
    } else {
      return "Error";
    }
  } catch (error: unknown) {
    console.error("Failed to create payment:", error);

    return "Error";
  }
}
