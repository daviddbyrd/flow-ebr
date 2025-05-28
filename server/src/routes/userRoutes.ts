import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getUser } from "../controllers/userController";

const router = express.Router();

router.get("/:id", asyncHandler(getUser));

export default router;
