import dotenv from "dotenv";
import express, { urlencoded } from "express";
import cors from "cors";
import errorHandler from "./middleware/errorMiddleware.js";
import connectMongo from "./database/mongo.js";
import goalRoutes from "./router/routes/goalRoutes.js";
import userRoutes from "./router/routes/userRoutes.js";

dotenv.config();

// Fire Up
const app = express();
const port = process.env.PORT || 5000;

// MongoDB
connectMongo();

// Middleware
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);
app.use(cors());

// Routes
app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
	console.log(`Server runnning on Port - ${port}`);
});
