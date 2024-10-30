import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { swaggerDocs, swaggerUi } from "./config/swagger.js";
import sequelize from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import protectedNewsRoute from "./routes/protectedNewsRoutes.js";
import unprotectedNewsRoute from "./routes/unprotectedNewsRoutes.js";
import invalidRoutes from "./routes/invalidRoutes.js"; // Importing invalid routes

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(express.json()); 
app.use(bodyParser.json());

// Route definitions
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/news", unprotectedNewsRoute);
app.use("/news", protectedNewsRoute);

// Swagger documentation route
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Handle invalid routes (this should be after the defined routes)
app.use(invalidRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync(); // This will create the tables defined in models if not exist
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
