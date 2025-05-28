import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getOrganisation,
  getLocations,
  getLocation,
} from "../controllers/orgControllers";

const router = express.Router();

router.get("/:organisationId", asyncHandler(getOrganisation));
router.get("/:organisationId/locations", asyncHandler(getLocations));
router.get("/:organisationId/location/:locationId", asyncHandler(getLocation));

export default router;
