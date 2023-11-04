import axiosInstance from "../API/axios";
import { userRoutesPath } from "../config/api.routes";

export const LoginMutation = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<any> => {
  return axiosInstance({
    method: "post",
    url: userRoutesPath.loginUser,
    data: {
      email,
      password,
    },
  });
};

export const getMeQuery = async () => {
  return axiosInstance({
    method: "get",
    url: userRoutesPath.getme,
  });
};

export const SignupMutation = async (data: {
  name: string,
  email: string,
  password: string
}) => {
  return axiosInstance({
    method: "post",
    url: userRoutesPath.createUser,
    data: data
  })
}