import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { conectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fabricRoutes from "./routes/fabric.routes.js";
import measurementRoutes from "./routes/measurement.routes.js";
import clientRoutes from "./routes/client.routes.js";
import orderRoutes from "./routes/order.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
config();
conectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", authRoutes);
app.use("/fabrics", fabricRoutes);
app.use("/measurements", measurementRoutes);
app.use("/clients", clientRoutes);
app.use("/orders", orderRoutes);

app.listen(process.env.PORT || 5173, () => {
  console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`);
});
