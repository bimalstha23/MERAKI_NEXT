
import { applyCoupon, createCoupon, deleteCoupon, getCoupons, updateCoupon } from "../../Controllers/couponController";
import { couponRoutesPath } from "../../constants/Api";
import { isAdmin, requireAuth } from "../../middlewares/authMiddlewares";
import { deserializeUser } from "../../middlewares/deserializeUser";
import AppRouter from "../../utils/AppRouter";

const CouponRouter = AppRouter.getInstance();


CouponRouter.post(couponRoutesPath.createCoupon, deserializeUser, requireAuth, isAdmin, createCoupon);
CouponRouter.get(couponRoutesPath.getCoupons, deserializeUser, requireAuth, getCoupons);
CouponRouter.put(couponRoutesPath.updateCoupon, deserializeUser, requireAuth, isAdmin, updateCoupon);
CouponRouter.delete(couponRoutesPath.deleteCoupon, deserializeUser, requireAuth, isAdmin, deleteCoupon);
CouponRouter.post(couponRoutesPath.applyCoupon, deserializeUser, requireAuth, applyCoupon);


export default CouponRouter;
