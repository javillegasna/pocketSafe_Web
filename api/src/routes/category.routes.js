//libraries
import { Router } from "express";
//modules
import * as categoryCtrl from "../controllers/category.controller"
//middleware
import {verifyToken} from "../middlewares/authjwt";
//actions
const router = Router();
router.post('/',verifyToken,categoryCtrl.create);
router.get('/',verifyToken,categoryCtrl.findAll);
router.get('/:categoryId',verifyToken,categoryCtrl.findOne);
router.put('/:categoryId',verifyToken,categoryCtrl.update)
router.delete('/:userId/:categoryId',verifyToken,categoryCtrl.deleteOne)
export default router