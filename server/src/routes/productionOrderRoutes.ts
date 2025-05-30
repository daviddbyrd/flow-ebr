import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getBasicFunctions,
  getBasicFunction,
  createProductionOrder,
} from "../controllers/productionOrderControllers";

const router = express.Router();

router.get(
  "/:productionOrderId/basic-functions",
  asyncHandler(getBasicFunctions)
);
router.get(
  "/:productionOrderId/basic-function/:basicFunctionId",
  asyncHandler(getBasicFunction)
);
router.post("/", asyncHandler(createProductionOrder));

export default router;
