const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "unityaccess",
    password: "root"
});

conn.connect(err=>{
    if(err){
        console.log(err);
        return err;
    }
    else{
        console.log('Db is ok')
    }
});

let query1 = "SELECT * FROM `students`";
conn.query(query1, (err, result) =>{
    console.log(err);
    console.log(result);
});

conn.end(err=>{
    if (err){
        console.log(err);
        return err;
    }
    else{
        console.log('Db closed');
    }
});
