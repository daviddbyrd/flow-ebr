import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getProductionOrders,
  getProductionOrder,
  createProcessUnit,
} from "../controllers/processUnitControllers";

const router = express.Router();

router.get(
  "/:processUnitId/production-orders",
  asyncHandler(getProductionOrders)
);
router.get(
  "/:processUnitId/production-order/:productionOrderId",
  asyncHandler(getProductionOrder)
);
router.post("/", asyncHandler(createProcessUnit));

export default router;
