const express = require("express");

import emojis from "./emojis";

const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);

export default router;
