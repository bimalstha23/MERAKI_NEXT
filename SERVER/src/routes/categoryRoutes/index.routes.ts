import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../../Controllers/categoryController";
import { categoryRoutesPath } from "../../constants/Api";
import { isAdmin, requireAuth } from "../../middlewares/authMiddlewares";
import { CategoryImageUpload } from "../../middlewares/upload";
import AppRouter from "../../utils/AppRouter";

const categoryRouter = AppRouter.getInstance();

categoryRouter.post(
  categoryRoutesPath.createCategory,
  requireAuth,
  isAdmin,
  CategoryImageUpload,
  addCategory
);

categoryRouter.get(categoryRoutesPath.getCategories, getCategories);
categoryRouter.get(categoryRoutesPath.getCategory, getCategory);
categoryRouter.put(
  categoryRoutesPath.updateCategory,
  requireAuth,
  isAdmin,
  updateCategory
);

categoryRouter.delete(
  categoryRoutesPath.deleteCategory,
  requireAuth,
  isAdmin,
  deleteCategory
);

export default categoryRouter;
