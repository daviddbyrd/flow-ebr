import express from "express";
import { asyncHandler } from "./utils/asyncHandler";
import { login, signup } from "./controllers";

const router = express.Router();

router.post("/login", asyncHandler(login));
router.post("/signup", asyncHandler(signup));

export default router;
