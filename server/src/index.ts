import { Request, Response } from "express";
import express from "express";
import { scanTable } from "./db/client";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes);

const PORT = process.env.PORT || 3000;

app.get("/get-organisations", async (req: Request, res: Response) => {
  try {
    const items = await scanTable("FlowMES_Organisations_Dev");
    const response = items?.map((item) => {
      return {
        id: item.id.S,
        name: item.name.S,
      };
    });
    console.log("response:", response);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
