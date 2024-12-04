import * as httpRequest from "../utils/httpRequest";

export const search = async (query) => {
  try {
    const res = await httpRequest.rapidAPIRequest.get("cities", {
      params: {
        minPopulation: 1000000,
        namePrefix: query,
      },

      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
