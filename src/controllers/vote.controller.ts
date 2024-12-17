import { Request, Response } from "express";
import prisma from "../libs/prisma";
import express from "express";

export const voteCandidate = async (req: Request, res: Response) => {
  const { candidateId } = req.body;
  const userId = (req as any).user.id;

  try {
    const exitingVote = await prisma.vote.findUnique({
      where: {
        userId,
      },
    });
    
    if(exitingVote) return res.status(409).json({ message: "You have already voted" });

    const vote = await prisma.vote.create({
      data: {
        userId,
        candidateId},
    });
    res.status(201).json({
         message: "Vote created successfully", vote 
        });

  } catch (error) {
        if(error instanceof Error){
            res.status(400).json({ 
                message: error.message 
            });
        }
  }
};

export const getWinner = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const result = await prisma.vote.groupBy({
      by: ["candidateId"],
      _count: {
        candidateId: true,
      },
      orderBy: {
        _count: {
          candidateId: "desc",
        },
      },
      take:3, 
    });

    if (result.length === 0) {
      return res.status(404).json({ message: "No winner found" });
    }

    const candidates = await prisma.candidate.findMany({
      where: {
        id: {
          in: result.map((r) => r.candidateId),
        },
      },
    });

    if (!candidates || candidates.length !== result.length) {
      return res.status(404).json({ message: "Candidates not found" });
    }

    const winners = result.map((r, index) => ({
      candidate: candidates[index], 
      votes: r._count.candidateId, 
    }));

    res.status(200).json({
      message: "get winners successfully",
      winners,
    });
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
