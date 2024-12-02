import { create } from "zustand";
import { isAccessTokenExpired } from "../utils/auth";

const useAuthStore = create(
  (set, get) => ({
    allUserData: null,
    loading: false,
    user: () => ({
      user_id: get().allUserData?.user_id || null,
      username: get().allUserData?.username || null,
    }),
    setUser: (user) => set({ allUserData: user }),
    setLoading: (loading) => set({ loading }),
    isLoggedIn: () => {
      const allUserData = get().allUserData;
      const refreshToken = localStorage.getItem("refresh_token");
      return (
        allUserData !== null &&
        refreshToken &&
        !isAccessTokenExpired(refreshToken)
      );
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
