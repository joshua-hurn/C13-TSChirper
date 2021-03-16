import * as express from "express";
import chirpsRouter from "./chirps";

const router = express.Router();

// route is already matched to /api
router.use("/chirps", chirpsRouter);

export default router;