//modules
import * as accountCtrl from "../controllers/account.controller"
//libraries
import { Router } from "express";
const router = Router();
//actions
router.post('/',accountCtrl.create);
router.get('/',accountCtrl.findAll);
router.get('/:accountId',accountCtrl.findOne);
router.put('/:accountId',accountCtrl.update)
router.delete('/:userId/:accountId',accountCtrl.deleteOne)
export default router