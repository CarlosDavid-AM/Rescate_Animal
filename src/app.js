import express from "express";
import cors from "cors";

// Routers
import personasRouter from "./routes/personasRouter.js";
import animalesRouter from "./routes/animalesRouter.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, HEAD, PUT, PATCH, DELETE",
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;

app.use("/api/personas", personasRouter);
app.use("/api/animales", animalesRouter);

app.listen(PORT, () => {
  console.log(`Server corriendo en: http://localhost:${PORT}`);
});
