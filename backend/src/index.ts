import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { notesRouter } from "./router.notes";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
//packages that are used
app.use(helmet());
app.use(cors());
app.use(express.json());
//endpoint
app.use("/api/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Started server!`);
  console.log(`Listening on port ${PORT}`);
});

