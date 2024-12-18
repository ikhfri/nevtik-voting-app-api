import express from "express";

import { voteCandidate, getWinner, hasVoted } from "../controllers/vote.controller";
import { authenticateJWT } from "../middleware/authMiddleware";
import { authorizeAdmin } from "../middleware/authorizeAdmin";
import { checkIfVoted } from "../middleware/checkVoteMiddleware";

const voteRouter = require("express").Router();

voteRouter.post("/",authenticateJWT,checkIfVoted, voteCandidate);
voteRouter.get("/winner", authenticateJWT, authorizeAdmin, getWinner);
voteRouter.get("/check", authenticateJWT, hasVoted);

export default voteRouter;
