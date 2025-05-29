import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getProcessUnits,
  getProcessUnit,
} from "../controllers/locationControllers";

const router = express.Router();

router.get("/:locationId/process-units", asyncHandler(getProcessUnits));
router.get(
  "/:locationId/process-unit/:processUnitId",
  asyncHandler(getProcessUnit)
);

export default router;
