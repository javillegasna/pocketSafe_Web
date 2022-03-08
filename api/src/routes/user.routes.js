import * as userCtrl from "../controllers/user.controller";
import { Router } from "express";
const router = Router();
router.post("/", userCtrl.create);//register or admin or moderator
router.get("/", userCtrl.findAll);//admin or moderator
router.get("/:userId", userCtrl.findOne);//all roles
router.put("/:userId", userCtrl.update);//all roles
router.delete("/:userId", userCtrl.deleteOne);//all roles
export default router;
