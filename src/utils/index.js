import { BASE_URL } from "../constant";

export const getFormattedDate = (dataString) => {
  return new Date(dataString).toLocaleString();
};

export const ajaxRequest = async (endPoint, method, body) => {
  const headers = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body) {
    headers.body = JSON.stringify(body);
  }
  const response = await fetch(`${BASE_URL}/${endPoint}`, headers);
  const data = await response.json();
  if(data.data){
    return data.data;
  }else{
    console.log('error', data.error);
    return null;
  }
};
