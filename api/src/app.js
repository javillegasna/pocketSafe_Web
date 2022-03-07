import express from "express";
import cors from "cors";
import morgan from "morgan";
import pkg from "../package.json";
//Import modules
import db from "./config/mongoDB.config"
import categoryRoutes from'./routes/category.routes'
import authRoutes from'./routes/auth.routes'
import userRoutes from'./routes/user.routes'
import accountRoutes from'./routes/account.routes'
//Import initial configuration
import { createRoles } from "./libs/initialSetup";
//Creating app
const app = express();

//Initial values and roles on api
createRoles();

//Configuration app middleware
app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// variables de express
app.set("pkg", pkg);

//Description of api on home.
app.get("/", (req, res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get("pkg").author,
    description: app.get('pkg').description,
    version:app.get('pkg').version
  });
});

//routes fo api
app.use('/api/account',accountRoutes)
app.use('/api/category',categoryRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
//database connection
db.connect
export default app;
