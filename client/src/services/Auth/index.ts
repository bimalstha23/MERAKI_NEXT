import axiosInstance from "@/axios";
import { userRoutesPath } from "@/constants/api.routes";

export const getMeQuery = async () => {
  const response: any = axiosInstance({
    method: "get",
    url: userRoutesPath.getme,
  }).then((res: any) => res.data);
  return response;
};
