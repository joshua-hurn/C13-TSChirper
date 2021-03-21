import * as express from "express";
import db from "../db";

const router = express.Router();

// Get one user by id from requests parameters
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const [user] = await db.users.one(id);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

// Get one user by id from requests parameters
router.get("/one/:name", async (req, res) => {
    const name = req.params.name;

    try {
        const [user] = await db.users.findUserByName(name);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

// // Get all users /api => /users =>  /
// router.get("/", async (req, res) => {
//     try {
//         const users = await db.users.all();
//         res.json(users);
//     } catch (error) {
//         console.log(error);
//         res.json(error);
//     }
// });

// Create a new user
router.post("/", async (req, res) => {
    const username = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const dbRes = await db.users.post(username, email, password);
        res.status(201).send(dbRes);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

// Delete a user
router.delete("/:id", async (req, res) => {
    const userid = req.params.id;

    try {
        await db.users.destroy(userid);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

export default router;