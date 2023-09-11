import { createRequire } from "module";


const require = createRequire(import.meta.url);
const mysql = require('mysql');


export let PORT = 8080;
export const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "unityaccess",
    password: "root"
});