import { createRequire } from "module";


const require = createRequire(import.meta.url);
//export const mysql = require('mysql');
export let PORT = 8080;


export const mysql = require("mysql2");
  
export const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "unityaccess",
  password: "root"
}).promise();
