import * as mysql from "mysql";

const pool = mysql.createPool({
    host: "localhost",
    user: 'chirprapp',
    password: 'hunter2',
    port: 3306,
    database: "chirpr",
    connectionLimit: 10
});

export const Query = <T = any>(query: string, values?: Array<string | number>) => {
    const sql = mysql.format(query, values);

    return new Promise<T>((resolve, reject) => {
        pool.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

import chirps from "./chirps";
import users from "./users";
import mentions from "./mentions";
export default {
    chirps,
    users,
    mentions
}