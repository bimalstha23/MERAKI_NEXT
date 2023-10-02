import { addtoCart, deleteCartItem, getCart, updateCartItem } from "../../Controllers/cartController";
import { cartRoutesPath } from "../../constants/Api";
import { requireAuth } from "../../middlewares/authMiddlewares";
import { deserializeUser } from "../../middlewares/deserializeUser";
import AppRouter from "../../utils/AppRouter";

const cartRouter = AppRouter.getInstance();

cartRouter.post(cartRoutesPath.createCart, deserializeUser, requireAuth, addtoCart);
cartRouter.get(cartRoutesPath.getCart, deserializeUser, requireAuth, getCart);
cartRouter.put(cartRoutesPath.updateCartItem, deserializeUser, requireAuth, updateCartItem);
cartRouter.delete(cartRoutesPath.deleteCart, deserializeUser, requireAuth, deleteCartItem);

export default cartRouter;