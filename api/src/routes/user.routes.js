import * as userCtrl from "../controllers/user.controller";
import { Router } from "express";
const router = Router();
router.post("/", userCtrl.create);
router.get("/", userCtrl.findAll);
router.get("/:userId", userCtrl.findOne);
router.put("/:userId", userCtrl.update);
router.delete("/:userId", userCtrl.deleteOne);
export default router;
