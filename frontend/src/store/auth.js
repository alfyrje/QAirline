import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

// const useAuthStore = create((set, get) => ({
//   allUserData: null,
//   loading: false,

//   user: () => ({
//     user_id: get().allUserData?.user_id || null,
//     username: get().allUserData?.username || null,
//   }),

//   setUser: (user) => set({ allUserData: user }),
//   setLoading: (loading) => set({ loading }),
//   isLoggedIn: () => get().allUserData !== null,
// }));

const initialState = {
  allUserData: null,
  loading: false,
  isLoggedIn: false,
  token: localStorage.getItem("access_token"),
  errorMsg: "",
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user) => set({ allUserData: user }),
      setLoading: (loading) => set({ loading }),
      isLoggedIn: () => get().allUserData !== null,
      setLogout: () => {
        set({ allUserData: null, isLoggedIn: false });
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

      },
    }),
    {
      name: "auth-storage",
    }
  )
);
export { useAuthStore };
