import axiosInstance from "@/axios";
import { userRoutesPath } from "@/constants/api.routes";

export const getMeQuery = async () => {
  const response: any = axiosInstance({
    method: "get",
    url: userRoutesPath.getme,
  }).then((res: any) => res.data);
  return response;
};


export const registerMutation = async (data: {
  name: string,
  email: string,
  password: string
}) => {
  return axiosInstance({
    method: 'post',
    url: userRoutesPath.createUser,
    data: data
  })
}


export const loginMutation = async (data: {
  email: string,
  password: string
}) => {
  return axiosInstance({
    method: 'post',
    url: userRoutesPath.loginUser,
    data: data
  })
}