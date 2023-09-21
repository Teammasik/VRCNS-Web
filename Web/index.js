
import { createRequire } from "module";
const require = createRequire(import.meta.url); // those two rows make "require" work simultaneously with "import"


import {PORT, pool} from "./connection.js"; // get_connection is a pool, if I'm not mistaken


const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true})) // not sure what this thing does, but let it be there
const excelJs = require("exceljs");


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


// http://217.18.60.195:8080/export/1
app.get('/export/:id', (req, res)=>{
    try{
        const fetchid = req.params.id;
        let workbook = new excelJs.Workbook()
        const sheet = workbook.addWorksheet("students")
        sheet.columns = [
            {header: "Имя", key: "userName", width: 15},
            {header: "Фамилия", key: "userSurname", width: 15},
            {header: "Группа", key: "userGroup", width: 15},
            {header: "Оценка", key: "mark", width: 15},
            {header: "Дата", key: "uDate", width: 15},
            {header: "Очки", key: "points", width: 15},
            {header: "Тип", key: "test", width: 15},
        ]


        pool.execute("SELECT userName, userSurname, userGroup, mark, uDate, points, tests.test FROM `students`, `tests` WHERE tests.id = students.test and students.test = ?",[fetchid])
        .then(result =>{
            result = result[0];
            result.forEach(item => {
                if (item.mark == 1){
                    item.mark = "Зачет"
                }
                else{
                    item.mark = "Незачёт"
                }
                sheet.addRow({
                    userName: item.userName,
                    userSurname: item.userSurname,
                    userGroup: item.userGroup,
                    mark: item.mark,
                    uDate: item.uDate,
                    points: item.points,
                    test: item.test
                })
            });

            //this thing is for correct formats and name of xls file
            var today = new Date();
            const now = today.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' });
            res.setHeader(
                "Content-Type",
                "application/vnd.opemxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment;filename=" + "students_" + now.toString() + ".xlsx"
            );

            workbook.xlsx.write(res);
            res.status(200);
            console.log("succesfully created xlsx file!");
        })

    } catch(error){
        console.log(error);
    }
})


// http://217.18.60.195:8080/sendData
app.post('/sendData', (req,res) => {
    pool.execute("insert into students(userName,userSurname, userGroup, mark, uDate, points, test) VALUES (?,?,?,?,?,?,?)", [req.body.name, req.body.surname,req.body.group,req.body.mark,req.body.udate,req.body.points,req.body.test])
        .then(() => {
            res.send(req.body)
            console.log("successfully sent data ")
        })
})


// method gets everything from main table
// http://217.18.60.195:8080/tshirts
app.get('/data', (req, res) =>{
    pool.execute("SELECT * FROM `students`")
        .then(result =>{
            result = result[0];
            res.send({
                result
            })
            console.log("request 'data' completed successfully");
        })
});


// http://217.18.60.195:8080/tshirt
app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: 'ss',
        size: 'large'
    });
});


// http://217.18.60.195:8080/points
app.get('/points', (req, res) => {
    pool.execute("SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<11 UNION SELECT DISTINCT COUNT(userName) FROM `students` WHERE points<16 UNION SELECT DISTINCT COUNT(userName) FROM `students` WHERE points<21 UNION SELECT DISTINCT COUNT(userName) FROM `students` WHERE points<26")
    .then(result =>{
        result = result[0];
        res.send({
            result
        })
        console.log("request 'points' completed successfully");
    })
});


// http://217.18.60.195:8080/attempts
// delete in final build
// app.get('/attempts', (req, res) => {
//     var conn = get_connection()
//     conn.connect(function (err){
//         let query3 = "SELECT COUNT(*) as students, amount as attempts FROM (SELECT count(*) as amount FROM `students`GROUP by userName) as sss GROUP BY amount"
//         conn.query(query3, (err, result) =>{
//             let studs = new Array;
//             let marks = new Array;
//             var dict1 = {};
//             for (let i = 0; i < result.length; i++) {
//                 studs.push(result[i].students);
//             }
//             for (let i = 0; i < result.length; i++) {
//                 marks.push(result[i].attempts);
//             }


//             var dict1 = {
//                 name: marks,
//                 value: studs
//             }

//             result.push(dict1)
//             res.status(200).send({
//                 result
//             })
//             console.log("request attempts completed successfully")
//         });
//     });
// });


// http://217.18.60.195:8080/fetchbyid/1
app.get('/fetchById/:id', (req, res) => {
    const fetchid=req.params.id;
    pool.execute('select id, userName, userSurname, userGroup from `students` where id=?', [fetchid])
        .then(result =>{
            result = result[0];
            res.send({
                result
            })
            console.log("request 'fetchById' completed successfully");
        })
});



// http://217.18.60.195:8080/testResults/1
app.get('/testResults/:test', (req, res) => {
    const fetchid=req.params.test;
    pool.execute("SELECT id, userName, userSurname, userGroup, mark, uDate, points FROM `students` where test = ?", [fetchid])
        .then(result =>{
            result = result[0];

            result.forEach(item => {
                try{
                    item.uDate = item.uDate.toString().substring(0,15)
                }
                catch{

                }
            });
            //.format('YYYY-mm-DD hh:mm a')
            res.send({
                result
            })
            console.log("request 'testResults' completed successfully");
        })
});


// http://217.18.60.195:8080/testScore/1
app.get('/testScore/:test', (req, res) => {
    const fetchid=req.params.test;
    pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<11 and test = ?', [fetchid])
        .then(result => {
            pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<16 and points>10 and test = ?', [fetchid])
                .then(result1 => {
                    pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<21 and points>15 and test = ?', [fetchid])
                    .then(result2 => {
                        pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<26 and points>20 and test = ?', [fetchid])
                        .then(result3 => {
                            var answer = {
                                test: fetchid,
                                data: {
                                    10: result[0][0].pnts,
                                    15: result1[0][0].pnts,
                                    20: result2[0][0].pnts,
                                    25: result3[0][0].pnts,
                                }
                            }
                            res.send({answer});
                            console.log("request testScore completed successfully");
                        })
                    })
                })
        })   
});


// http://217.18.60.195:8080/testPercentResult/1
app.get('/testPercentResult/:test', (req, res) => {
    const fetchid=req.params.test;
    pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<11 and test = ?', [fetchid])
        .then(result => {
            pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<16 and points>10 and test = ?', [fetchid])
                .then(result1 => {
                    pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<21 and points>15 and test = ?', [fetchid])
                    .then(result2 => {
                        pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<26 and points>20 and test = ?', [fetchid])
                        .then(result3 => {
                            var summ = result[0][0].pnts + result1[0][0].pnts + result2[0][0].pnts + result3[0][0].pnts
                            var answer = {
                                test: fetchid,
                                data: {
                                    10: Math.round(result[0][0].pnts/summ*100),
                                    15: Math.round(result1[0][0].pnts/summ*100),
                                    20: Math.round(result2[0][0].pnts/summ*100),
                                    25: Math.round(result3[0][0].pnts/summ*100),
                                }
                            }
                            res.send({answer});
                            console.log("request testPercentResult completed successfully");
                        })
                    })
                })
        })   
});


// the most trashy trash I've ever wrote, gonna rewrite it later
// http://217.18.60.195:8080/allData
app.get('/allData', (req, res) => {
    pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<11 and test = 1')
        .then(result => {
            pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<16 and points>10 and test = 1')
                .then(result1 => {
                    pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<21 and points>15 and test = 1')
                    .then(result2 => {
                        pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<26 and points>20 and test = 1')
                        .then(result3 => {
                            pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<11 and test = 2')
                                .then(result4 => {
                                    pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<16 and points>10 and test = 2')
                                        .then(result5 => {
                                            pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<21 and points>15 and test = 2')
                                            .then(result6 => {
                                                pool.execute('SELECT DISTINCT COUNT(userName) as pnts FROM `students` WHERE points<26 and points>20 and test = 2')
                                                .then(result7 => {
                                                    var summ = result[0][0].pnts + result1[0][0].pnts + result2[0][0].pnts + result3[0][0].pnts
                                                    var summ2 = result4[0][0].pnts + result5[0][0].pnts + result6[0][0].pnts + result7[0][0].pnts
                                                    var answer = {
                                                        firstTest: {test: 1,
                                                            data: {
                                                                10: Math.round(result[0][0].pnts/summ*100),
                                                                15: Math.round(result1[0][0].pnts/summ*100),
                                                                20: Math.round(result2[0][0].pnts/summ*100),
                                                                25: Math.round(result3[0][0].pnts/summ*100),
                                                            }},
                                                        secondTest: {
                                                            test: 2,
                                                            data: {
                                                                10: Math.round(result4[0][0].pnts/summ2*100),
                                                                15: Math.round(result5[0][0].pnts/summ2*100),
                                                                20: Math.round(result6[0][0].pnts/summ2*100),
                                                                25: Math.round(result7[0][0].pnts/summ2*100),
                                                            }
                                                        }
                                                    }
                                                    res.send({answer});
                                                    console.log("request testPercentResult completed successfully");
                                                })
                                            })
                                        })
                                })   
                        })
                    })
                })
        })   
        
});


// http://217.18.60.195:8080/testList
app.get('/testList', (req, res) => {
    pool.execute("SELECT id FROM `tests`")
        .then((result)=>{
            result = result[0]
            res.send({result})
            //console.log("request testList completed successfully")
        })
});


app.listen(
    PORT,
    () => console.log(`it works on http://localhost:${PORT}`)
);
