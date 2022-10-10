import express from "express";
import authors from "./authors";
import jobs from "./jobs";

const router = express.Router();
router.use("/authors", authors);
router.use("/jobs", jobs);

export default router;
