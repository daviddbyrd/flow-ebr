import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getBasicFunctions,
  getBasicFunction,
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

export default router;
