import { useAuthStore } from "../store/auth";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

// Configuring global toast notifications using Swal.mixin
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

// Function to handle user login
export const login = async (email, password) => {
  try {
    // Making a POST request to obtain user tokens
    const { data, status } = await axios.post("user/token/", {
      email,
      password,
    });

    // If the request is successful (status code 200), set authentication user and display success toast
    if (status === 200) {
      setAuthUser(data.access, data.refresh);

      // Displaying a success toast notification
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
    }

    // Returning data and error information
    return { data, error: null };
  } catch (error) {
    // Handling errors and returning data and error information
    return {
      data: null,
      error: error.response.data?.detail || "Something went wrong",
    };
  }
};

// Function to handle user registration
export const register = async (full_name, email, password, password2) => {
  try {
    // Making a POST request to register a new user
    const { data } = await axios.post("user/register/", {
      full_name,
      email,
      password,
      password2,
    });

    // Logging in the newly registered user and displaying success toast
    await login(email, password);

    // Displaying a success toast notification
    Toast.fire({
      icon: "success",
      title: "Signed Up Successfully",
    });

    // Returning data and error information
    return { data, error: null };
  } catch (error) {
    // Handling errors and returning data and error information
    return {
      data: null,
      error: error.response.data || "Something went wrong",
    };
  }
};

// Function to handle user logout
export const logout = () => {
  // Removing access and refresh tokens from cookies, resetting user state, and displaying success toast
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  useAuthStore.getState().setUser(null);

  // Displaying a success toast notification
  Toast.fire({
    icon: "success",
    title: "You have been logged out.",
  });
  console.log("User has been logged out."); // Log statement to indicate logout
};

// Function to set the authenticated user on page load
export const setUser = async () => {
  try {
    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    if (!accessToken || !refreshToken) {
      return;
    }

    if (isAccessTokenExpired(accessToken)) {
      const response = await getRefreshToken(refreshToken);
      setAuthUser(response.access, response.refresh);
    } else {
      setAuthUser(accessToken, refreshToken);
    }
  } catch (error) {
    console.error("Error setting user:", error);
  }
};
Cookies;

// Function to set the authenticated user and update user state
export const setAuthUser = (access_token, refresh_token) => {
  Cookies.set("access_token", access_token, { expires: 1, secure: true });
  Cookies.set("refresh_token", refresh_token, { expires: 7, secure: true });

  const user = jwt_decode(access_token) ?? null;
  if (user) {
    useAuthStore.getState().setUser(user);
  }
  useAuthStore.getState().setLoading(false);
  console.log(
    "User state after setting auth:",
    useAuthStore.getState().allUserData
  ); // Log the state
};

// Function to refresh the access token using the refresh token
export const getRefreshToken = async (refresh_token) => {
  console.log("Sending request to refresh token...");
  const response = await axios.post(
    "http://127.0.0.1:8000/users/api/token/refresh/",
    {
      refresh: refresh_token,
    }
  );
  console.log("Received new tokens:", response.data);
  return response.data;
};

// Function to check if the access token is expired
export const isAccessTokenExpired = (accessToken) => {
  try {
    const decodedToken = jwt_decode(accessToken);
    return decodedToken.exp < Date.now() / 1000;
  } catch (err) {
    return true;
  }
};
