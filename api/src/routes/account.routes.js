//modules
import * as accountCtrl from "../controllers/account.controller"
//libraries
import { Router } from "express";
const router = Router();
//actions
import {verifyToken} from "../middlewares/authjwt";
router.post('/',accountCtrl.create);
router.get('/',accountCtrl.findAll);
router.get('/:accountId',accountCtrl.findOne);
router.put('/:accountId',accountCtrl.update)
router.delete('/:userId/:accountId',accountCtrl.deleteOne)
export default router