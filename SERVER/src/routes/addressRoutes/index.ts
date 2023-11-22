import { createAddress, deleteAddress, getAddress, getAddresses, updateAddress } from "../../Controllers/addressController";
import { addressRoutesPath } from "../../constants/Api";
import { requireAuth } from "../../middlewares/authMiddlewares";
import { deserializeUser } from "../../middlewares/deserializeUser";
import AppRouter from "../../utils/AppRouter";


const addressRoutes = AppRouter.getInstance();

addressRoutes.post(addressRoutesPath.createAddress, deserializeUser, requireAuth, createAddress);
addressRoutes.get(addressRoutesPath.getAddress, deserializeUser, requireAuth, getAddress);
addressRoutes.put(addressRoutesPath.updateAddress, deserializeUser, requireAuth, updateAddress);
addressRoutes.delete(addressRoutesPath.deleteAddress, deserializeUser, requireAuth, deleteAddress);
addressRoutes.get(addressRoutesPath.getAddresses, deserializeUser, requireAuth, getAddresses)


export default addressRoutes;
