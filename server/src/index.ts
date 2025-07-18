import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import orgRoutes from "./routes/orgRoutes";
import userRoutes from "./routes/userRoutes";
import locationRoutes from "./routes/locationRoutes";
import processUnitRoutes from "./routes/processUnitRoutes";
import productionOrderRoutes from "./routes/productionOrderRoutes";
import basicFunctionRoutes from "./routes/basicFunctionRoutes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/org", orgRoutes);
app.use("/user", userRoutes);
app.use("/location", locationRoutes);
app.use("/process-unit", processUnitRoutes);
app.use("/production-order", productionOrderRoutes);
app.use("/basic-function", basicFunctionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
