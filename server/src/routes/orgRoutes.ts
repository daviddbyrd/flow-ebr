import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getOrganisationRoute,
  getLocations,
  getLocation,
  createOrganisation,
} from "../controllers/orgControllers";

const router = express.Router();

router.get("/:organisationId", asyncHandler(getOrganisationRoute));
router.get("/:organisationId/locations", asyncHandler(getLocations));
router.get("/:organisationId/location/:locationId", asyncHandler(getLocation));
router.post("/", asyncHandler(createOrganisation));

export default router;
