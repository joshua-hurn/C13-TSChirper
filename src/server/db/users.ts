import { Query } from "./index";

const all = () => Query("SELECT * FROM users");
const one = (id: string) => Query("SELECT * FROM users WHERE users.id = ?", [id]);
const findUserByName = (username: string) => Query("SELECT users.id FROM users WHERE users.name = ?", [username]);
const post = (username: string, email: string, password: string) => Query("INSERT INTO users(name, email, password) VALUES (?,?,?)", [username, email, password]);
const destroy = (id: string) => Query("DELETE FROM users WHERE id = ?", [id]);

export default {
    all,
    one,
    findUserByName,
    post,
    destroy
}