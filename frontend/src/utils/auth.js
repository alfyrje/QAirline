import { useAuthStore } from "../store/auth";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

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
  console.log(
    "Calling setAuthUser function with:",
    access_token,
    refresh_token
  );
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
  );
};

export const setUser = async () => {
  try {
    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    if (!accessToken || !refreshToken) {
      return;
    }

    if (isAccessTokenExpired(accessToken)) {
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
    const { data, status } = await axios.post(
      "http://127.0.0.1:8000/users/token/",
      {
        email,
        password,
      }
    );

    if (status === 200) {
      setAuthUser(data.access, data.refresh);
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
    }
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response.data?.detail || "Something went wrong",
    };
  }
};

export const logout = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  useAuthStore.getState().setUser(null);
  Toast.fire({
    icon: "success",
    title: "You have been logged out.",
  });
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
    const { data } = await axios.post("http://127.0.0.1:8000/users/register/", {
      email,
      first_name: name_firstname,
      last_name: name_lastname,
      personal_info: {
        tel_num: phone_number,
        first_name: name_firstname,
        last_name: name_lastname,
        date_of_birth: date_birth,
        citizen_id: ID_citizen,
        nationality: nationality, // Add nationality field if needed
        gender,
      },
      username: email,
      password,
    });
    await login(email, password);
    Toast.fire({
      icon: "success",
      title: "Signed Up Successfully",
    });

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response.data || "Something went wrong",
    };
  }
};
