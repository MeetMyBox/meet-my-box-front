import axios from "axios";

// Replace with your FedEx API credentials
const fedExCredentials = {
  key: "YOUR_FEDEX_API_KEY",
  password: "YOUR_FEDEX_API_PASSWORD",
  accountNumber: "YOUR_FEDEX_ACCOUNT_NUMBER",
  meterNumber: "YOUR_FEDEX_METER_NUMBER",
};

export async function calculateFedExRate(
  weight: number,
  width: number,
  length: number,
  height: number
) {
  const url = "https://gateway.fedex.com/rate"; // Replace with the correct FedEx API endpoint

  const requestData = {
    RequestedShipment: {
      DropoffType: "REGULAR_PICKUP", // Adjust based on your requirements
      PackagingType: "YOUR_PACKAGING", // Adjust as needed, e.g., FEDEX_BOX, FEDEX_ENVELOPE, etc.
      Shipper: {
        Address: {
          // Include sender details
        },
      },
      Recipient: {
        Address: {
          // Include recipient details
        },
      },
      PackageCount: "1",
      RequestedPackageLineItems: [
        {
          GroupPackageCount: 1,
          Weight: {
            Units: "KG", // or LB depending on your needs
            Value: weight,
          },
          Dimensions: {
            Length: length,
            Width: width,
            Height: height,
            Units: "CM", // or IN
          },
        },
      ],
      ShippingChargesPayment: {
        PaymentType: "SENDER", // Adjust based on who pays the shipping
        Payor: {
          ResponsibleParty: {
            AccountNumber: fedExCredentials.accountNumber,
            Contact: null,
            Address: {
              CountryCode: "US", // Adjust based on location
            },
          },
        },
      },
    },
  };

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        "Content-Type": "application/json",
        "X-FedEx-Api-Key": fedExCredentials.key,
        "X-FedEx-Api-Password": fedExCredentials.password,
        "X-FedEx-Account-Number": fedExCredentials.accountNumber,
        "X-FedEx-Meter-Number": fedExCredentials.meterNumber,
      },
    });

    return response.data; // Process the API response to get the rate
  } catch (error) {
    console.error("Error fetching FedEx rates:", error);
    throw error;
  }
}
