import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getProcessUnits,
  getProcessUnit,
  createLocation,
} from "../controllers/locationControllers";

const router = express.Router();

router.get("/:locationId/process-units", asyncHandler(getProcessUnits));
router.get(
  "/:locationId/process-unit/:processUnitId",
  asyncHandler(getProcessUnit)
);
router.post("/", asyncHandler(createLocation));

export default router;
