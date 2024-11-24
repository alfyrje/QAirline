import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "./constants";

const useAxios = () => {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (!isAccessTokenExpired(accessToken)) {
      return req;
    }

    const response = await getRefreshToken(refreshToken);
    setAuthUser(response.access, response.refresh);
    req.headers.Authorization = `Bearer ${response.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
