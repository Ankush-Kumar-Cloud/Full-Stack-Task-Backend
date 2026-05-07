import express from "express";
import { loginUser, registerUser } from "../controllers/authConntroller.js";


const authRoutes = express.Router();

authRoutes.post("/auth/register", registerUser);
authRoutes.post("/auth/login", loginUser);

export default authRoutes;