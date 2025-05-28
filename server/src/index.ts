import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import orgRoutes from "./routes/orgRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/org", orgRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
