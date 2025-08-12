import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getUser, getAccess } from "../controllers/userController";

const router = express.Router();

router.get("/:userId", asyncHandler(getUser));
router.get("/:userId/access", asyncHandler(getAccess));

export default router;
