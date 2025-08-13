import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getUser,
  getAccess,
  getAdminOrganisations,
  grantAccess,
} from "../controllers/userController";

const router = express.Router();

router.get("/:userId", asyncHandler(getUser));
router.get("/:userId/access", asyncHandler(getAccess));
router.get("/:userId/admin-organisations", asyncHandler(getAdminOrganisations));
router.post("/grant-access", asyncHandler(grantAccess));

export default router;
