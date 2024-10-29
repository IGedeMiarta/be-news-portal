import express from "express";
import sequelize from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import protectedNewsRoute from "./routes/protectedNewsRoutes.js";
import unprotectedNewsRoute from "./routes/unprotectedNewsRoutes.js";

const app = express();
const PORT = process.env.APP_PORT || 8000;

app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("Hello World");
}); 

app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/news", unprotectedNewsRoute);
app.use("/news", protectedNewsRoute);

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
