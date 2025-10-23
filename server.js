import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDoc = YAML.load('./swagger.yaml');
const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/", (req,res) => res.send(`
    <h2>API Working Fine</h2>
    <h3>API Endpoints</h3>
    <h4>/api/auth/register</h4>
    <h4>/api/auth/login</h4>
    <h4>/api/auth/refresh</h4>
    <h4>/api/bookings</h4>
    <h4>/api/destinations</h4>
    <h4>/api/packages</h4>
    <h4>/api/payment</h4>
    `))

app.use("/api/auth",authRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/destinations",destinationRoutes);
app.use("/api/packages",packageRoutes);
app.use('/api/payment',paymentRoutes)

app.use('/api/docs',swaggerUi.serve,swaggerUi.setup(swaggerDoc));

const PORT=process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));