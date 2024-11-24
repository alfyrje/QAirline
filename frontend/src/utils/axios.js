import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
// apiInstance.interceptors.request.use(async (req) => {
//   const accessToken = Cookies.get("access_token");
//   const refreshToken = Cookies.get("refresh_token");

//   if (accessToken && isAccessTokenExpired(accessToken)) {
//     try {
//       console.log("Access token expired. Attempting to refresh token...");
//       const response = await getRefreshToken(refreshToken);
//       setAuthUser(response.access, response.refresh);
//       req.headers.Authorization = `Bearer ${response.access}`;
//       console.log("Token refreshed successfully.");
//     } catch (error) {
//       console.error("Failed to refresh token", error);
//     }
//   } else if (accessToken) {
//     req.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return req;
// });
export default apiInstance;
