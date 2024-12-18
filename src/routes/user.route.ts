import { loginUser, logout, registerUser } from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/authMiddleware";
import { authorizeAdmin } from "../middleware/authorizeAdmin";
const authRouter = require("express").Router();

authRouter.post("/register",authenticateJWT, authorizeAdmin,registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logout);




export default authRouter