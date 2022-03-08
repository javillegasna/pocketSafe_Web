//modules
import * as accountCtrl from "../controllers/account.controller"
//libraries
import { Router } from "express";
const router = Router();
//actions
import {verifyToken} from "../middlewares/authjwt";
router.post('/',verifyToken,accountCtrl.create);
router.get('/',verifyToken,accountCtrl.findAll);
router.get('/:accountId',verifyToken,accountCtrl.findOne);
router.put('/:accountId',verifyToken,accountCtrl.update)
router.delete('/:userId/:accountId',verifyToken,accountCtrl.deleteOne)
export default router