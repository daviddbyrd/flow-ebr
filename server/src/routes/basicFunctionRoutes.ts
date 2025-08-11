import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createBasicFunction,
  updateBasicFunction,
  editBasicFunction,
} from "../controllers/basicFunctionControllers";

const router = express.Router();

router.post("/new", asyncHandler(createBasicFunction));
router.post("/update", asyncHandler(updateBasicFunction));
router.post("/edit", asyncHandler(editBasicFunction));

export default router;
