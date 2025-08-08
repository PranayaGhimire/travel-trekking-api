import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { adminOnly, protect } from "./middlewares/authMiddleware.js";

const swaggerDoc = YAML.load('./swagger.yaml');
const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/destinations",destinationRoutes);
app.use("/api/packages",packageRoutes);

app.use('/api/docs',swaggerUi.serve,swaggerUi.setup(swaggerDoc));

const PORT=process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));