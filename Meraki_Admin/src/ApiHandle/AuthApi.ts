import axiosInstance from "../API/axios";
import { userRoutesPath } from "../config/api.routes";

export const LoginMutation = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const response: any = axiosInstance({
      method: "post",
      url: userRoutesPath.loginUser,
      data: {
        email,
        password,
      },
    });
    return response?.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getMeQuery = async () => {
  const response: any = axiosInstance({
    method: "get",
    url: userRoutesPath.getme,
  }).then((res: any) => res.data);
  return response;
};
