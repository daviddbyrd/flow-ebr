import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getOrganisation } from "../controllers/orgControllers";

const router = express.Router();

router.get("/:id", asyncHandler(getOrganisation));

export default router;
