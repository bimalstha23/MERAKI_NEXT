export const userRoutesPath = {
  createUser: "/auth/createuser",
  loginUser: "/auth/login",
  refresh: "/auth/refreshToken",
  getme: "/auth/getme",
};

export const productRoutesPath = {
  createProduct: "/product/createproduct",
  getProducts: "/product/getproducts",
  getProduct: "/product/getproduct",
  updateProduct: "/product/updateproduct",
  deleteProduct: "/product/deleteproduct",
};

export const categoryRoutesPath = {
  createCategory: "/category/createcategory",
  getCategories: "/category/getcategories",
  getCategory: "/category/getcategory",
  updateCategory: "/category/updatecategory",
  deleteCategory: "/category/deletecategory",
};

export const orderRoutesPath = {
  createOrder: "/order/createorder",
  getOrders: "/order/getorders",
  getOrder: "/order/getorder",
  updateOrder: "/order/updateorder",
  changeStatus: "/order/changestatus",
  deleteOrder: "/order/deleteorder",
};

export const basePath = {
  version: "/v1",
  baseuri: "/api/meraki",
};
