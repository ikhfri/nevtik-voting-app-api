import { loginUser, logout, registerUser } from "../controllers/auth.controller";
const authRouter = require("express").Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logout);




export default authRouter