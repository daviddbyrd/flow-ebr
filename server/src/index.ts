import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = parseInt(process.env.PORT || "3001");

app.listen(() => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
