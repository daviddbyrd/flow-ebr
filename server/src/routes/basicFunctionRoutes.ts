import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createBasicFunction,
  updateBasicFunction,
} from "../controllers/basicFunctionControllers";

const router = express.Router();

router.post("/", asyncHandler(createBasicFunction));
router.put("/", asyncHandler(updateBasicFunction));

export default router;
