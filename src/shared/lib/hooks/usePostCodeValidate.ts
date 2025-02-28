const countryCodeMap: Record<string, string> = {
  Italy: "IT",
  France: "FR",
  Germany: "DE",
  Spain: "ES",
  Netherlands: "NL",
  Austria: "AT",
  Poland: "PL",
  Switzerland: "CH",
  "United Kingdom": "GB",
  Cyprus: "CY",
  Russia: "RU",
  Kazakhstan: "KZ",
  Belarus: "BY",
  Kyrgyzstan: "KG",
  Georgia: "GE",
  Turkmenistan: "TM",
  Azerbaijan: "AZ",
  // Add more countries as needed
};

import axios from "axios";

export const validatePostcode = async (
  country: string,
  postcode: string | number
) => {
  try {
    // Retrieve the country code from the mapping
    const countryCode = countryCodeMap[country];

    // If the country code is not found in the map, return an error
    if (!countryCode) {
      console.error(`Country ${country} is not supported`);
      return false;
    }

    // Make the API request using the correct country code
    const response = await axios.get(
      `https://app.zipcodebase.com/api/v1/search?apikey=d25cf550-74c4-11ef-96f2-038e3c212ee9&codes=${postcode}&country=${countryCode}`
    );

    if (
      response.data &&
      response.data.results &&
      response.data.results[postcode] &&
      response.data.results[postcode].length > 0
    ) {
      // console.log("Valid postcode:", postcode);
      return true;
    } else {
      // console.log("Invalid postcode:", postcode);
      return false; // Postcode is not valid
    }
  } catch (error) {
    // console.error("Error validating postcode:", error);
    return false; // Handle error case
  }
};
