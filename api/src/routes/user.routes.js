import * as userCtrl from "../controllers/user.controller";
import { Router } from "express";
import { verifyToken ,isAdmin} from "../middlewares/authjwt";
import { checkRolesExisted } from "../middlewares/verifySignup";

const router = Router();
router.post("/",[verifyToken,isAdmin,checkRolesExisted], userCtrl.create);//register or admin or moderator
router.get("/", [verifyToken,isAdmin],userCtrl.findAll);//admin or moderator
router.get("/:userId",verifyToken, userCtrl.findOne);//all roles
router.put("/:userId",verifyToken, userCtrl.update);//all roles
router.delete("/:userId", [verifyToken,isAdmin],userCtrl.deleteOne);//all roles
export default router;
