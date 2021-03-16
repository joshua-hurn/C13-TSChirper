import * as express from "express";
import { chirp } from "../types";
import { GetChirps, GetChirp, UpdateChirp, CreateChirp, DeleteChirp } from "../utils/chirpstore";

const router = express.Router();

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const chirp = GetChirp(id);
    chirp.id = id;
    res.status(200).send(chirp);
});

// Get all chirps /api => /chirps =>  /
router.get("/", (req, res) => {
    const chirps = GetChirps();
    delete chirps.nextid
    const tempArr = Object.entries(chirps);
    const chirpArr = tempArr.map(chirp => {
        const newChirp: chirp = {
            id: chirp[0],
            user: chirp[1].user,
            message: chirp[1].message
        }
        return newChirp
    });
    chirpArr.reverse();
    res.send(chirpArr);
});

// Create a new chirp
router.post("/", (req, res) => {
    CreateChirp(req.body);
    res.sendStatus(200);
});

//Edit a chirp
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const chirp = req.body;
    UpdateChirp(id, chirp);
    res.sendStatus(200);
});

// Delete a chirp
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    DeleteChirp(id);
    res.sendStatus(200);
});

export default router;