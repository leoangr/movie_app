import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./store/routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors(
  {
    origin: "http://localhost:5173"
  }
));
app.use("/", routes);

app.use((req, res) => {
  res.status(404).json({ message: "Halaman tidak ditemukan" });
});

const DOMAIN = process.env.DOMAIN;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at ${DOMAIN}`);
});

