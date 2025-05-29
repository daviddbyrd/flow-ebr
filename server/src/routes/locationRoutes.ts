import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getProcessUnits } from "../controllers/locationControllers";

const router = express.Router();

router.get("/:locationId/process-units", asyncHandler(getProcessUnits));

export default router;
