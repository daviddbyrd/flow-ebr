import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getBasicFunctionsRoute,
  getBasicFunction,
  createProductionOrder,
  reorder,
} from "../controllers/productionOrderControllers";

const router = express.Router();

router.get(
  "/:productionOrderId/basic-functions",
  asyncHandler(getBasicFunctionsRoute)
);
router.get(
  "/:productionOrderId/basic-function/:basicFunctionId",
  asyncHandler(getBasicFunction)
);
router.post("/", asyncHandler(createProductionOrder));
router.post("/:productionOrderId/reorder", asyncHandler(reorder));

export default router;
