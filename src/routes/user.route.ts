import { getUserById, loginUser, logout, registerUser } from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/authMiddleware";
import { authorizeAdmin } from "../middleware/authorizeAdmin";
const authRouter = require("express").Router();

authRouter.post("/register",registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", authenticateJWT,logout);
authRouter.get("/user/:id", authenticateJWT, getUserById);




export default authRouter   