import express from "express";
import cors from "cors";
import authRouter from "./routes/user.route";
import candiatesRouter from "./routes/candidate.route";
import cookieParser from "cookie-parser";
import voteRouter from "./routes/vote.route";

const app = express();
const PORT = 3000;
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/candidates", candiatesRouter)
app.use("/vote", voteRouter)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
