import { Query } from "./";

const all = () => Query("SELECT * FROM chirps");
const one = (id: string) => Query("SELECT * FROM chirps WHERE chirps.id = ?", [id]);
const post = (chirp: string, userid: string) => Query<{ insertId: number }>("INSERT INTO chirps(userid, content) VALUES (?,?)", [userid, chirp]);
const put = (id: string, chirp: string) => Query("UPDATE chirps SET content = ? WHERE id = ?", [chirp, id]);
const destroy = (id: string) => Query("DELETE FROM chirps WHERE id = ?", [id]);

export default {
    all,
    one,
    post,
    put,
    destroy
}