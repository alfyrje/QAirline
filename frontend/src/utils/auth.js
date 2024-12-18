import { useAuthStore } from "../store/auth";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export const isAccessTokenExpired = (accessToken) => {
  try {
    const decodedToken = jwt_decode(accessToken);
    return decodedToken.exp < Date.now() / 10000;
  } catch (err) {
    return true;
  }
};

export const getRefreshToken = async (refresh_token) => {
  console.log("Sending request to refresh token with:", refresh_token);
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/users/token/refresh/",
      {
        refresh: refresh_token,
      }
    );
    console.log("Received new tokens:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
};

export const setAuthUser = (access_token, refresh_token) => {
  console.error("Access token is expired.");
  if (isAccessTokenExpired(access_token)) {
    useAuthStore.getState().setLogout();
    return;
  }

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);

  const user = jwt_decode(access_token) ?? null;

  if (user) {
    useAuthStore.getState().setUser(user);
    useAuthStore.setState({ isLoggedIn: true });
  } else {
    useAuthStore.getState().setLogout();
  }
  useAuthStore.getState().setLoading(false);
};

export const setUser = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (!accessToken || !refreshToken) {
      return;
    }

    if (isAccessTokenExpired(refreshToken)) {
      console.log("Access token expired. Attempting to refresh token...");
      const response = await getRefreshToken(refreshToken);
      setAuthUser(response.access, response.refresh);
    } else {
      setAuthUser(accessToken, refreshToken);
    }
  } catch (error) {
    console.error("Error setting user:", error);
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/users/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
        email: email, 
      }),
    });
    const data = await response.json();
    if (data.status === 200) {
      setAuthUser(data.access, data.refresh);
      return data;
    } else {
      console.log(data)
      console.log("Failed to login:", data);
      return data;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      data: "Failed",
      error: "Network error or server unreachable",
      status: null, // Always include the 'status' property
    };
  }
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  useAuthStore.getState().setUser(null);
  useAuthStore.setState({ isLoggedIn: false });
  console.log("User has been logged out.");
};

export const register = async (formData) => {
  const {
    name_lastname,
    name_firstname,
    date_birth,
    gender,
    nationality,
    email,
    phone_number,
    ID_citizen,
    password,
    confirm_pwd,
  } = formData;
  console.log(formData);
  try {
    const response = await fetch("http://127.0.0.1:8000/users/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        first_name: name_firstname,
        last_name: name_lastname,
        personal_info: {
          first_name: name_firstname,
          last_name: name_lastname,
          qr_email: email,
          date_of_birth: date_birth,
          citizen_id: ID_citizen,
          nationality: nationality,
          gender,
        },
        username: email,
        password: password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      data: "Failed",
      error: error || "Something went wrong",
    };
  }
};
