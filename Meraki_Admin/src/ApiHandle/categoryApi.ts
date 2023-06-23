//  fetch category data

import { axiosInstance } from "../API/axios";
import { categoryRoutesPath } from "../config/api.routes";

export const fetchCategories = async () => {
  const response = await axiosInstance({
    method: "GET",
    url: categoryRoutesPath.getCategories,
  });
  return response;
};

export const fetchCategory = async (id: number) => {
  const response = await axiosInstance({
    method: "GET",
    url: `/getcategory/${id}`,
  });
  return response.data;
};
