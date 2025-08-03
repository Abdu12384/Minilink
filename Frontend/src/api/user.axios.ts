
import { logout } from "@/store/slice/userSliece";
import { store } from "@/store/store";
import axios from "axios";
import toast from "react-hot-toast";

export const userAxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL + "/",
	withCredentials: true,
});

let isRefreshing = false;

userAxiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			if (!isRefreshing) {
				isRefreshing = true;
				try {
					await userAxiosInstance.post("/auth/refresh-token");
					isRefreshing = false;
					return userAxiosInstance(originalRequest);
				} catch (refreshError) {
					isRefreshing = false;

					store.dispatch(logout());

					window.location.href = "/";
					toast("Please login again");
					return Promise.reject(refreshError);
				}
			}
		}

		return Promise.reject(error);
	}
);
