import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createBasicFunction } from "../controllers/basicFunctionControllers";

const router = express.Router();

router.post("/", asyncHandler(createBasicFunction));

export default router;
