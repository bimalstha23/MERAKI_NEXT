import axiosInstance from "@/axios";
import { categoryRoutesPath } from "@/config";



export const fetchCategories = async (limit:number) => {
    const response = await axiosInstance({
      method: "GET",
      url: categoryRoutesPath.getCategories,
        params: {
            limit
        }
    });
    return response;
  };
  

