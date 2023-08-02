import { getChartData, getStats } from "../../Controllers/StatsControl";
import { statsRoutesPath } from "../../constants/Api";
import AppRouter from "../../utils/AppRouter";
import { deserializeUser } from "../../middlewares/deserializeUser";
import { isAdmin, requireAuth } from "../../middlewares/authMiddlewares";

const statsRouter = AppRouter.getInstance();

statsRouter.get(statsRoutesPath.getStats   ,deserializeUser ,requireAuth ,  isAdmin ,  getStats);
statsRouter.get(statsRoutesPath.getChartData   ,deserializeUser ,requireAuth ,  isAdmin ,  getChartData)


export default statsRouter;
