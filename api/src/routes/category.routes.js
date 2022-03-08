//libraries
import { Router } from "express";
//modules
import * as categoryCtrl from "../controllers/category.controller"
//middleware
import {verifyToken,isAdmin} from "../middlewares/authjwt";
//actions
const router = Router();
router.post('/',categoryCtrl.create);
router.get('/',categoryCtrl.findAll);
router.get('/:categoryId',categoryCtrl.findOne);
router.put('/:categoryId',categoryCtrl.update)
router.delete('/:userId/:categoryId',categoryCtrl.deleteOne)
export default router