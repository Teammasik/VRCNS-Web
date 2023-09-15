import { createRequire } from "module";


const require = createRequire(import.meta.url);
export const mysql = require('mysql');
export let PORT = 8080;


export function get_connection(){
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "unityaccess",
        password: "root",
    })
}