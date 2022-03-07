//modules
import * as categoryCtrl from "../controllers/category.controller"
//libraries
import { Router } from "express";
const router = Router();
//actions
router.post('/',categoryCtrl.create);
router.get('/',categoryCtrl.findAll);
router.get('/:categoryId',categoryCtrl.findOne);
router.put('/:categoryId',categoryCtrl.update)
router.delete('/:userId/:categoryId',categoryCtrl.deleteOne)
export default router