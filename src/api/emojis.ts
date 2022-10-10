import express from "express";

const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.json(["😀", "😳", "🙄"]);
});

export default router;
