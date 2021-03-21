import { Query } from "./index";

const one = (id: string) => Query("call spUserMentions(?)", [id]);
const post = (chirpid: string, userid: string) => Query("INSERT INTO mentions(userid, chirpid) VALUES (?,?)", [userid, chirpid]);
const destroy = (chirpid: string) => Query("DELETE FROM mentions WHERE chirpid = ?", [chirpid]);

export default {
    one,
    post,
    destroy
}