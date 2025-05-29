import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getProductionOrders } from "../controllers/processUnitControllers";

const router = express.Router();

router.get(
  "/:processUnitId/production-orders",
  asyncHandler(getProductionOrders)
);

export default router;
