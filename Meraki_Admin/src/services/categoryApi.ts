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

export const addCategory = async (data: any) => {
  const response = await axiosInstance({
    method: "POST",
    url: categoryRoutesPath.createCategory,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
  },
  });
  return response;
}

export const updateCategory = async (data: any) => {
  const response = await axiosInstance({
    method: "PUT",
    url: categoryRoutesPath.updateCategory,
    data,

  });
  return response;
}