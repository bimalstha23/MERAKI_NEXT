import axiosInstance from "@/axios";
import { categoryRoutesPath } from "@/constants/api.routes";
import { CategoryData } from "@/types";

export const fetchCategories = async (limit: number | undefined): Promise<CategoryData> => {
  const response = await axiosInstance({
    method: "GET",
    url: categoryRoutesPath.getCategories,
    params: {
      limit
    }
  });
  return response;
};


