import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routers
import personasRouter from "./routes/personasRouter.js";
import animalesRouter from "./routes/animalesRouter.js";
import procesosRouter from "./routes/procesosRouter.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, HEAD, PUT, PATCH, DELETE",
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Endpoints
app.use("/api/personas", personasRouter);
app.use("/api/animales", animalesRouter);
app.use("/api/procesos", procesosRouter);

app.listen(PORT, () => {
  console.log(`Server corriendo en: http://localhost:${PORT}`);
});
