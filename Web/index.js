
import { createRequire } from "module";
const require = createRequire(import.meta.url); // those two rows make "require" work simultaneously with "import"


import {PORT, get_connection} from "./connection.js"; // get_connection is a pool, if I'm not mistaken


const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true})) // not sure what this thing does, but let it be there


const cors = require("cors");
app.use(
    cors({
        origin: "*",
    })
)


// example of json file
//  {
//     "name": "custom",
//     "surname": "asswe",
//     "group": "none",
//     "mark": 1,
//     "udate": "2023-06-22",
//     "points": 22,
//     "test": 1
//   }


// http://217.18.60.195:8080/sendData
app.post('/sendData', (req,res) => {
    let query1 = "insert into students(userName,userSurname, userGroup, mark, uDate, points, test) VALUES (?,?,?,?,?,?,?)";
    conn.query(query1, [req.body.name, req.body.surname,req.body.group,req.body.mark,req.body.udate,req.body.points,req.body.test] ,(err, result) =>{
        res.send(req.body);
        console.log("successfully sent data ")
    });
})


// method gets everything from main table
// http://217.18.60.195:8080/tshirt
app.get('/data', (req, res) =>{
    var conn = get_connection()
    conn.connect(function (err){
        let query1 = "SELECT * FROM `students`";
        conn.query(query1, (err, result) =>{
                res.status(200).send({
                    result
                });
                console.log("request data completed successfully");
            });
    });
});


// crutch, kinda useless request, had to get rid of conn.end() func, still trying to find way to make it properly
app.get('/stop', (req, res) =>{
    conn.end(err=>{
        if (err){
            console.log(err);
            return err;
        }
        else{
            console.log('Db closed');
        }
    });
    res.status(200);
})


// http://217.18.60.195:8080/tshirt
app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: 'ss',
        size: 'large'
    });
});


// http://217.18.60.195:8080/points
app.get('/points', (req, res) => {
    var conn = get_connection()
    conn.connect(function (err){
        let query2 = "SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<11 UNION SELECT DISTINCT COUNT(userName) FROM `students` WHERE points<16 UNION SELECT DISTINCT COUNT(userName) FROM `students` WHERE points<21 UNION SELECT DISTINCT COUNT(userName) FROM `students` WHERE points<26"
        conn.query(query2, (err, result) =>{
            res.status(200).send({
                result
            })
            console.log("request points completed successfully")
        });
    });
});


// http://217.18.60.195:8080/attempts
// delete in final build
app.get('/attempts', (req, res) => {
    var conn = get_connection()
    conn.connect(function (err){
        let query3 = "SELECT COUNT(*) as students, amount as attempts FROM (SELECT count(*) as amount FROM `students`GROUP by userName) as sss GROUP BY amount"
        conn.query(query3, (err, result) =>{
            let studs = new Array;
            let marks = new Array;
            var dict1 = {};
            for (let i = 0; i < result.length; i++) {
                studs.push(result[i].students);
            }
            for (let i = 0; i < result.length; i++) {
                marks.push(result[i].attempts);
            }


            var dict1 = {
                name: marks,
                value: studs
            }

            result.push(dict1)
            res.status(200).send({
                result
            })
            console.log("request attempts completed successfully")
        });
    });
});


// http://217.18.60.195:8080/fetchbyid/1
app.get('/fetchById/:id', (req, res) => {
    var conn = get_connection()
    conn.connect(function (err){
        const fetchid=req.params.id;
        conn.query('select id, userName, userSurname, userGroup from `students` where id=?', fetchid,(err, result) =>{
            res.status(200).send({result})
            console.log("request fetchById completed successfully")
        });
    });
});


// http://217.18.60.195:8080/testResults/1
app.get('/testResults/:test', (req, res) => { 
    var conn = get_connection()
    conn.connect(function (err){
        const fetchid=req.params.test;
        conn.query("SELECT id, userName, userSurname, userGroup, mark FROM `students` where test = ?", fetchid,(err, result) =>{
            res.status(200).send({result})
            console.log("request testResults completed successfully")
        });
    });
});


// http://217.18.60.195:8080/testScore/1
app.get('/testScore/:test', (req, res) => {
    var conn = get_connection()
    conn.connect(function (err){
        const fetchid=req.params.test;
        conn.query('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<11 and test = ?', fetchid,(err, result) =>{
            conn.query('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<16 and points>10 and test = ?', fetchid,(err, result1) =>{
                conn.query('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<21 and points>15 and test = ?', fetchid,(err, result2) =>{
                    conn.query('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<26 and points>20 and test = ?', fetchid,(err, result3) =>{
                        var answer = {
                            test: fetchid,
                            data: {
                                10: result[0].pnts,
                                15: result1[0].pnts,
                                20: result2[0].pnts,
                                25: result3[0].pnts,
                            }
                        }
                        res.status(200).send({answer})
                        console.log("request testScore completed successfully")
                    });
                });
            });
        });
    });
});


// http://217.18.60.195:8080/testPercentResult/1
app.get('/testPercentResult/:test', (req, res) => {
    var conn = get_connection()
    conn.connect(function (err){
        const fetchid=req.params.test;
        var summ
        conn.query('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<11 and test = ?', fetchid,(err, result) =>{
            conn.query('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<16 and points>10 and test = ?', fetchid,(err, result1) =>{
                conn.query('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<21 and points>15 and test = ?', fetchid,(err, result2) =>{
                    conn.query('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<26 and points>20 and test = ?', fetchid,(err, result3) =>{
                        summ = result[0].pnts + result1[0].pnts + result2[0].pnts + result3[0].pnts
                        var answer = {
                            test: fetchid,
                            data: {
                                10: Math.round(result[0].pnts/summ*100),
                                15: Math.round(result1[0].pnts/summ*100),
                                20: Math.round(result2[0].pnts/summ*100),
                                25: Math.round(result3[0].pnts/summ*100),
                            }
                        }
                        res.status(200).send({answer})
                        console.log("request testPercentResult completed successfully")
                    });
                });
            });
        });
    });
});


// http://217.18.60.195:8080/testList
app.get('/testList', (req, res) => {
    var conn = get_connection()
    conn.connect(function (err){
        let query2 = "SELECT id, test FROM `tests`"
        conn.query(query2, (err, result) =>{
            res.status(200).send({
                result
            })
            console.log("request testList completed successfully")
        });
    });
});


app.listen(
    PORT,
    () => console.log(`it works on http://localhost:${PORT}`)
);
