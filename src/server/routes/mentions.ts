import * as express from "express";
import db from "../db";

const router = express.Router();

// Get one user by id from requests parameters
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await db.mentions.one(id);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

// // Get all mentions /api => /mentions =>  /
// router.get("/", async (req, res) => {
//     try {
//         const mentions = await db.mentions.all();
//         res.json(mentions);
//     } catch (error) {
//         console.log(error);
//         res.json(error);
//     }
// });

// Create a new user
router.post("/", async (req, res) => {
    const userid = req.body.userid;
    const chirpid = req.body.chirpid;

    try {
        const dbRes = await db.mentions.post(chirpid, userid);
        res.status(201).send(dbRes);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

// Delete a user
router.delete("/:id", async (req, res) => {
    const chirpid = req.params.id;

    try {
        await db.mentions.destroy(chirpid);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

export default router;