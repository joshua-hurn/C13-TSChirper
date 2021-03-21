import * as express from "express";
import db from "../db";

const router = express.Router();

// Get one chirp by id from requests parameters
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const [chirp] = await db.chirps.one(id);
        res.json(chirp);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

// Get all chirps /api => /chirps =>  /
router.get("/", async (req, res) => {
    try {
        const chirps = await db.chirps.all();
        res.json(chirps);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

// Create a new chirp
router.post("/", async (req, res) => {
    const chirp = req.body.content;
    const userid = req.body.userid;

    try {
        const dbRes = await db.chirps.post(chirp, userid);
        res.status(201).send(dbRes);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

//Edit a chirp
router.put("/:id", async (req, res) => {
    const chirpid = req.params.id;
    const chirp = req.body.content;

    try {
        await db.chirps.put(chirpid, chirp);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

// Delete a chirp
router.delete("/:id", async (req, res) => {
    const chirpid = req.params.id;

    try {
        await db.chirps.destroy(chirpid);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

export default router;