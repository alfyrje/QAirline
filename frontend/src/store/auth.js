import { create } from "zustand";
import { isAccessTokenExpired } from "../utils/auth";

const useAuthStore = create(
  (set, get) => ({
    allUserData: null,
    loading: false,
    isLoggedIn: false,
    user: () => ({
      user_id: get().allUserData?.user_id || null,
      username: get().allUserData?.username || null,
    }),
    setUser: (user) => set({ allUserData: user }),
    setLoading: (loading) => set({ loading }),
    checkLoginStatus: () => {  // Move the check to a separate function
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        set({ isLoggedIn: false });
        return false;
      }
      const loginStatus = !isAccessTokenExpired(refreshToken);
      set({ isLoggedIn: loginStatus });
      return loginStatus;
    },
    setLogout: () => {
      set({ allUserData: null, isLoggedIn: false });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("auth-storage"); // Xóa thông tin người dùng trong localStorage
    },
  }),
  {
    name: "auth-storage",
  }
);
export { useAuthStore };
