export const userRoutesPath = {
  createUser: "/auth/createuser",
  loginUser: "/auth/login",
  refresh: "/auth/refreshToken",
  getme: "/auth/getme",
  googleAuth: "/auth/google",
  logout: "/auth/logout",
  updateUser: "/auth/updateuser",
};

export const productRoutesPath = {
  createProduct: "/product/createproduct",
  getProducts: "/product/getproducts",
  getProduct: "/product/getproduct",
  updateProduct: "/product/updateproduct",
  deleteProduct: "/product/deleteproduct",
  changeStatus: "/product/changestatus",
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

export const paymentRoutesPath = {
  createPayment: "/payment/createpayment",
  getPayments: "/payment/getpayments",
  getPayment: "/payment/getpayment",
  updatePayment: "/payment/updatepayment",
  deletePayment: "/payment/deletepayment",
};


export const cartRoutesPath = {
  createCart: "/cart/createcart",
  getCart: "/cart/getcart",
  deleteCartItem: "/cart/deletecartitem",
  updateCartItem: "/cart/updatecartitem",
  deleteCart: "/cart/deletecart",
};
export const addressRoutesPath = {
  createAddress: "/address/createaddress",
  getAddress: "/address/getaddress",
  deleteAddress: "/address/deleteaddress/:id",
  updateAddress: "/address/updateaddress",
  getAddresses: "/address/getaddresses",
};



export const statsRoutesPath = {
  getStats: "/stats/getstats",
  getChartData: "/stats/getchartdata",
  getTopProducts: "/stats/gettopproducts",

};


export const basePath = {
  version: "/v1",
  baseuri: "/api/meraki",
};
