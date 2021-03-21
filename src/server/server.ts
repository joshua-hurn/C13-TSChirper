import * as express from "express";
import * as path from "path";
import apiRouter from "./routes";

const app = express();

// parse JSON so I can use in routes
app.use(express.json());
// parse form data so I can use in routes
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);
app.use(express.static("public"));
app.use("*", (req, res) => res.sendFile(path.join(__dirname, "../public/index.html")))

app.listen(3000);