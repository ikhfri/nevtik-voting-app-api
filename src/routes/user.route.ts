import { registerUser } from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/authMiddleware";
const authRouter = require("express").Router();

authRouter.post("/register", authenticateJWT,registerUser);
authRouter.post("/login", authenticateJWT,registerUser);



export default authRouter