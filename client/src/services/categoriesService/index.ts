import axiosInstance from "@/axios";
import { categoryRoutesPath } from "@/constants/api.routes";

export const fetchCategories = async (limit: number | undefined) => {
  const response = await axiosInstance({
    method: "GET",
    url: categoryRoutesPath.getCategories,
    params: {
      limit
    }
  });
  return response;
};


