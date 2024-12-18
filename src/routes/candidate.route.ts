import { createCandidate, deleteCandidate, getCandidates,  updateCandidate } from "../controllers/candidate.controller";
import { authenticateJWT } from "../middleware/authMiddleware";
import { authorizeAdmin } from "../middleware/authorizeAdmin";
const candiatesRouter = require("express").Router();

candiatesRouter.post("/", authenticateJWT, authorizeAdmin,createCandidate);
candiatesRouter.get("/", authenticateJWT, getCandidates);
candiatesRouter.put("/:id", authenticateJWT,authorizeAdmin ,updateCandidate);
candiatesRouter.delete("/:id", authenticateJWT,authorizeAdmin, deleteCandidate);


export default candiatesRouter
