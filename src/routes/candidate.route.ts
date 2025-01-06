import { createCandidate, deleteCandidate, getCandidates,  updateCandidate } from "../controllers/candidate.controller";
import { authenticateJWT } from "../middleware/authMiddleware";
import { authorizeAdmin } from "../middleware/authorizeAdmin";
import { upload } from "../middleware/uploadMiddleware";
const candiatesRouter = require("express").Router();

candiatesRouter.post("/", authenticateJWT, authorizeAdmin,upload.single("image"),createCandidate);
candiatesRouter.get("/", authenticateJWT, getCandidates);
candiatesRouter.put("/:id", authenticateJWT,authorizeAdmin ,updateCandidate);
candiatesRouter.delete("/:id", authenticateJWT,authorizeAdmin, deleteCandidate);

export default candiatesRouter