//  fetch category data

import { AxiosInstance } from "../API/axios";

export const fetchCategories = async () => {
  const response = await AxiosInstance({
    method: "GET",
    url: "/getcategories",
  });
  return response.data;
};

export const fetchCategory = async (id: number) => {
  const response = await AxiosInstance({
    method: "GET",
    url: `/getcategory/${id}`,
  });
  return response.data;
};
