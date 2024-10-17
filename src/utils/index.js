import axios from "axios";

const axiosInstance = () => { 
  return axios.create({
    baseURL: "https://revive-production.up.railway.app",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const formatDate = (date) => {
  if (!date) throw new Error("Invalid Date");
  const input = date;
  const parts = input.split("T")[0].split("-");
  const output = parts[2] + "-" + parts[1] + "-" + parts[0];
  return output;
};

export default axiosInstance;
