import axios from "axios";
export const baseUrl = "https://strapi-meet-my-box-production.up.railway.app";

// export const baseUrl = "http://localhost:1337";
export async function useGetBlock(
  url: string,
  isProcess?: boolean,
  isNews?: boolean
): Promise<any> {
  try {
    const api_url = baseUrl + url;
    let params: any = {
      populate: "*",
    };
    if (isProcess) {
      params = {
        populate: {
          image_card: { populate: "image" },
          questions: { populate: "*" },
        },
      };
    }
    if (isNews) {
      params = {
        populate: { news_card: { populate: "image" } },
        "pagination[page]": 1,
        "pagination[pageSize]": 1,
        publicationState: "preview",
      };
    }
    const response = await axios.get(api_url, {
      params: params,
      headers: {
        Authorization:
          "Bearer c9dcf6ab5450d75f770ef50c5351c906c0ac431ca1b5ed445916e85d767031e49b2a11019f46bca8e58b8c80a9e5c37dc2611536b81fa4a2e054ef9cd4a28a8e62839619cc079035a425d50ea789f9afce040d50503c81190dca0b3861cd5aedfa6281faad0ceef882be5123c2786fa818c453bbb1bc7fdc7168015b3469b430",
      },
    });

    // console.log("Block got successfully:", response.data.data.attributes);

    return response.data.data.attributes;
  } catch (error: unknown | any) {
    console.error("Failed to get block:", error);
    if (error.response) {
      return [];
    } else {
      return [];
    }
  }
}
