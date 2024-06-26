/**
 * This file can be used to store global variables that you need to access across multiple places.
 * We've put a few here that we know you will need.
 * Fill in the blank for each one
 */
export const MY_BU_ID = "U84054577";
export const BASE_API_URL = "https://spark-se-assessment-api.azurewebsites.net/api";

// You can get this from Gradescope aka x-functions-key
export const TOKEN = "6se7z2q8WGtkxBlXp_YpU-oPq53Av-y_GSYiKyS_COn6AzFuTjj4BQ==";

//method to call my APIs
export const get={
  method:"GET"
}

// This is a helper function to generate the headers with the x-functions-key attached
export const GET_DEFAULT_HEADERS = () => {
  var headers = new Headers();
  headers.append("x-functions-key", TOKEN); //attaching x-functions-key
  headers.append("MY_BU_ID",MY_BU_ID); //attaching bu_id

  // You will need to add another header here
  // If you do not, the API will reject your request (:
  return headers;
};
