import { Request, Response } from "express";
import prisma from "../libs/prisma";
import express from "express";

export const voteCandidate = async (req: Request, res: Response) => {
  const { candidateId } = req.body;
  const userId = (req as any).user.id;

  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const existingVote = await prisma.vote.findFirst({
      where: { userId },
    });

    if (existingVote) {
      return res.status(409).json({ message: "You have already voted" });
    }

    const vote = await prisma.vote.create({
      data: {
        userId,
        candidateId,
      },
    });

    res.status(201).json({
      message: "Vote created successfully",
      vote,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
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



export const getVotes = async (req: Request, res: Response) => {
  try {
    
    const totalUser = await prisma.user.count();
    const userVoted = await prisma.vote.count();
    const userNotvoted = totalUser - userVoted;

    res.status(200).json({
      message: "get votes successfully",
      totalUser,
      userVoted,
      userNotvoted
    })
  } catch (error) {
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
}


export const hasVoted = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const vote = await prisma.vote.findFirst({
      where: { userId },
    });
    if (vote) {
      res.status(208).json({ message: "You have voted" });
    } else {
      res.status(200).json({ message: "You have not voted" });
    }
  } catch (error) {
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
}

