import { Mutex } from "async-mutex";
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import { userRoutesPath } from "../config/api.routes";

const Axios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL as string,
  withCredentials: true,
});

// Axios.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error.response.data.err)
// );
const redirectToLogin = () => {
  // Replace "/login" with the appropriate path to your login page
  window.location.href = "/";
};

const mutex: Mutex = new Mutex();

export const axiosInstance = async (
  config: AxiosRequestConfig
): Promise<any> => {
  await mutex.waitForUnlock();
  try {
    const response: AxiosResponse = await Axios(config);
    return response.data;
  } catch (error: any) {
    console.error(error, "error");
    if (error.response.data?.message === "You are not logged in" || error.response.data === "jwt expired") {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshResponse: AxiosResponse = await Axios({
            method: "get",
            url: userRoutesPath.refresh,
            withCredentials: true,
          });
          if (refreshResponse.data) {
            // Retry the initial request
            const response: AxiosResponse = await Axios({
              ...config,
              withCredentials: true,
            });
            console.log("refresh token success")
            return response.data;
          } else {
            // redirectToLogin()
            // do not retry the initial request 
            console.log("refresh token expired");
          }
        } catch{
          // redirectToLogin()
          console.log("refresh token expired");
        } finally {
          release();
        }
      } else {
        // Wait for the mutex to unlock and then retry the initial request
        // redirectToLogin()
        await mutex.waitForUnlock();
        const response: AxiosResponse = await Axios(config);
        return response.data;
      }
    }
    throw error;
  }
};

export default axiosInstance;
