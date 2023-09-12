
import { createRequire } from "module";
const require = createRequire(import.meta.url);


import {PORT} from "./connection.js";
import {conn} from "./connection.js";


const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))


conn.connect(err=>{
    if(err){
        console.log(err);
        return err;
    }
    else{
        console.log('Db is ok')
    }
});

// example of json file
// let s = {
//     "name": "custom",
//     "surname": "asswe",
//     "group": "none",
//     "mark": 1,
//     "udate": "2023-06-22",
//     "points": 22,
//     "test": 1
//   }


app.post('/sendData', (req,res) => {
    let query1 = "insert into students(username,usersurname, usergroup, mark, udate, points, test) VALUES (?,?,?,?,?,?,?)";
    conn.query(query1, [req.body.name, req.body.surname,req.body.group,req.body.mark,req.body.udate,req.body.points,req.body.test] ,(err, result) =>{
        res.send(req.body);
    });
})


app.get('/data', (req, res) =>{
    let query1 = "SELECT * FROM `students`";
    conn.query(query1, (err, result) =>{
            res.status(200).send({
                result
            })
        });

});


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


app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: 'ss',
        size: 'large'
    })
});


app.get('/points', (req, res) => {
    let query2 = "SELECT DISTINCT COUNT(username) as pnts FROM `students` WHERE points<11 UNION SELECT DISTINCT COUNT(username) FROM `students` WHERE points<16 UNION SELECT DISTINCT COUNT(username) FROM `students` WHERE points<21 UNION SELECT DISTINCT COUNT(username) FROM `students` WHERE points<26"
    conn.query(query2, (err, result) =>{
        res.status(200).send({
            result
        })
    });
});


app.get('/attempts', (req, res) => {
    let query3 = "SELECT COUNT(*) as students, amount as attempts FROM (SELECT count(*) as amount FROM `students`GROUP by username) as sss GROUP BY amount"
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
    });
});


app.get('/fetchbyid/:id', (req, res) => {
    const fetchid=req.params.id;
    conn.query('select id, username, usersurname, usergroup from `students` where id=?', fetchid,(err, result) =>{
        res.status(200).send({result})
    });
});


// здесь нужно прописывать либо assembly либо disassembly, e.g: testResults/assembly (outdated)
// теперь пишем айдишник
app.get('/testResults/:test', (req, res) => { 
    const fetchid=req.params.test;
    conn.query("SELECT id, username, usersurname, usergroup, mark FROM `students` where test = ?", fetchid,(err, result) =>{
        res.status(200).send({result})
    });
});

// тут то же самое
app.get('/testScore/:test', (req, res) => {
    const fetchid=req.params.test;
    conn.query('SELECT DISTINCT COUNT(username) as pnts FROM `students` WHERE points<11 and test = ?', fetchid,(err, result) =>{
        conn.query('SELECT DISTINCT COUNT(username) as pnts FROM `students` WHERE points<16 and points>10 and test = ?', fetchid,(err, result1) =>{
            conn.query('SELECT DISTINCT COUNT(username) as pnts FROM `students` WHERE points<21 and points>15 and test = ?', fetchid,(err, result2) =>{
                conn.query('SELECT DISTINCT COUNT(username) as pnts FROM `students` WHERE points<26 and points>20 and test = ?', fetchid,(err, result3) =>{
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
                });
            });
        });
    });
});


// to fix: при округлении может получится так, что процентов будет 101
// важно упомянуть, что я отправляю инты, а не проценты, но думаю это не проблема
app.get('/testPercentResult/:test', (req, res) => {
    const fetchid=req.params.test;
    var summ
    conn.query('SELECT DISTINCT COUNT(username) as pnts FROM `students` WHERE points<11 and test = ?', fetchid,(err, result) =>{
        conn.query('SELECT DISTINCT COUNT(username) as pnts FROM `students` WHERE points<16 and points>10 and test = ?', fetchid,(err, result1) =>{
            conn.query('SELECT DISTINCT COUNT(username) as pnts FROM `students` WHERE points<21 and points>15 and test = ?', fetchid,(err, result2) =>{
                conn.query('SELECT DISTINCT COUNT(username) as pnts FROM `students` WHERE points<26 and points>20 and test = ?', fetchid,(err, result3) =>{
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
                });
            });
        });
    });
});


app.get('/testList', (req, res) => {
    let query2 = "SELECT test FROM `tests`"
    conn.query(query2, (err, result) =>{
        res.status(200).send({
            result
        })
    });
});


app.listen(
    PORT,
    () => console.log(`it works on http://localhost:${PORT}`)
);

