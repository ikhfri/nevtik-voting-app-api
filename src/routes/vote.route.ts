import express from "express";

import { voteCandidate, getWinner, hasVoted, getVotes, getVotesById } from "../controllers/vote.controller";
import { authenticateJWT } from "../middleware/authMiddleware";
import { authorizeAdmin } from "../middleware/authorizeAdmin";
import { checkIfVoted } from "../middleware/checkVoteMiddleware";

const voteRouter = require("express").Router();

voteRouter.post("/",authenticateJWT,checkIfVoted, voteCandidate);
voteRouter.get("/winner", authenticateJWT, authorizeAdmin,getWinner);
voteRouter.get("/check", authenticateJWT, hasVoted);
voteRouter.get("/statistics", authenticateJWT,authorizeAdmin, getVotes);
voteRouter.get("/:id", authenticateJWT,authorizeAdmin, getVotesById);

export default voteRouter;
