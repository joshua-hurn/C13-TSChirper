import * as express from "express";
import chirpsRouter from "./chirps";
import usersRouter from "./users";
import mentionsRouter from './mentions';

const router = express.Router();

// route is already matched to /api
router.use("/chirps", chirpsRouter);
router.use("/users", usersRouter);
router.use("/mentions", mentionsRouter);

export default router;