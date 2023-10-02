
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
            let today = new Date();
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
    pool.execute("insert into students(userName,userSurname, userGroup, mark, uTime, uDate, points, test) VALUES (?,?,?,?,?,?,?)", [req.body.name, req.body.surname,req.body.group,req.body.mark,req.body.udate,req.body.points,req.body.test])
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
        .then(data =>{
            data = data[0];
            res.send({
                data
            })
            console.log("request 'fetchById' completed successfully");
        })
});



// http://217.18.60.195:8080/testResults/1
app.get('/testResults/:test', (req, res) => {
    const fetchid=req.params.test;
    pool.execute("SELECT id, userName, userSurname, userGroup, mark, uTime, uDate, points FROM `students` where test = ?", [fetchid])
        .then(data =>{
            data = data[0];

            data.forEach(item => {
                try{
                    item.uDate = item.uDate.toString().substring(0,15)
                }
                catch{

                }
            });
            //.format('YYYY-mm-DD hh:mm a')
            res.send({
                data
            })
            console.log("request 'testResults' completed successfully");
        })
});


// http://217.18.60.195:8080/testScore/1
app.get('/testScore/:test', (req, res) => {
    const fetchid=req.params.test;
    pool.execute('SELECT SUM(CASE WHEN points<11 and test=? THEN 1 ELSE 0 END)f1,SUM(CASE WHEN points<16 and points>10 and test=? THEN 1 ELSE 0 END)f2,SUM(CASE WHEN points<21 and points>15 and test=? THEN 1 ELSE 0 END)f3,SUM(CASE WHEN points<26 and points>20 and test=? THEN 1 ELSE 0 END)f4 FROM students', [fetchid,fetchid,fetchid,fetchid])
        .then(result => {
            result = result[0]
            let data = [{
                test: fetchid,
                10: Number(result[0].f1),
                15: Number(result[0].f2),
                20: Number(result[0].f3),
                25: Number(result[0].f4)
            }]
            res.send({data})
        })   
});


// http://217.18.60.195:8080/testPercentResult/1
app.get('/testPercentResult/:test', (req, res) => {
    const fetchid=req.params.test;
    pool.execute('SELECT SUM(CASE WHEN points<11 and test=? THEN 1 ELSE 0 END)f1,SUM(CASE WHEN points<16 and points>10 and test=? THEN 1 ELSE 0 END)f2,SUM(CASE WHEN points<21 and points>15 and test=? THEN 1 ELSE 0 END)f3,SUM(CASE WHEN points<26 and points>20 and test=? THEN 1 ELSE 0 END)f4 FROM students', [fetchid,fetchid,fetchid,fetchid])
        .then(result => {
            result = result[0]
            let summ = Number(result[0].f1) + Number(result[0].f2) + Number(result[0].f3) + Number(result[0].f4)
            let data = [{
                test: fetchid,
                10: Math.round(Number(result[0].f1)/summ*100),
                15: Math.round(Number(result[0].f2)/summ*100),
                20: Math.round(Number(result[0].f3)/summ*100),
                25: Math.round(Number(result[0].f4)/summ*100)
            }]
            res.send({data})
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
                                                    pool.execute('SELECT COUNT(students.userName) as "counts", students.test FROM students GROUP BY students.userName, students.test')
                                                    .then(result8 => {
                                                        result8 = result8[0]
                                                        // looks bad :/
                                                        let counted = [0,0,0,0];
                                                        let counted2 = [0,0,0,0];
                                                        result8.forEach(item => {
                                                            if (item.counts == 1 & item.test == 1){
                                                                counted[0]++
                                                            }
                                                            if(item.counts == 2 & item.test == 1){
                                                                counted[1]++
                                                            }
                                                            if(item.counts == 3 & item.test == 1){
                                                                counted[2]++
                                                            }
                                                            if(item.counts > 3 & item.test == 1){
                                                                counted[3]++
                                                            }
                                                            if (item.counts == 1 & item.test == 2){
                                                                counted2[0]++
                                                            }
                                                            if(item.counts == 2 & item.test == 2){
                                                                counted2[1]++
                                                            }
                                                            if(item.counts == 3 & item.test == 2){
                                                                counted2[2]++
                                                            }
                                                            if(item.counts > 3 & item.test == 2){
                                                                counted2[3]++
                                                            }
                                                            
                                                        });
      
                                                        let summ = result[0][0].pnts + result1[0][0].pnts + result2[0][0].pnts + result3[0][0].pnts
                                                        let summ2 = result4[0][0].pnts + result5[0][0].pnts + result6[0][0].pnts + result7[0][0].pnts
                                                        let data = [
                                                        {test: 1,
                                                            name: "assembly",
                                                            pointsData: {
                                                                data:[
                                                                    {
                                                                        name: "0-10",
                                                                        value: Math.round(result[0][0].pnts/summ*100)
                                                                    },
                                                                    {
                                                                        name: "10-15",
                                                                        value: Math.round(result1[0][0].pnts/summ*100)
                                                                    },
                                                                    {
                                                                        name: "15-20",
                                                                        value: Math.round(result2[0][0].pnts/summ*100)
                                                                    },
                                                                    {
                                                                        name: "20-25",
                                                                        value: Math.round(result3[0][0].pnts/summ*100)
                                                                    }
                                                                ]
                                                         
                                                            },
                                                            attemptsData:{
                                                                data:[
                                                                    {
                                                                        name: "с 1-й попытки",
                                                                        value: counted[0]
                                                                    },
                                                                    {
                                                                        name:"со 2-й попытки",
                                                                        value: counted[1]
                                                                    },
                                                                    {
                                                                        name:"с 3-й попытки",
                                                                        value: counted[2]
                                                                    },
                                                                    {
                                                                        name:"с 4-й попытки и более",
                                                                        value: counted[3]
                                                                    }
                                                                ]
                                                            }
                                                            },
                                                        {test: 2,
                                                            name: "disassembly",
                                                            pointsData: {
                                                                data:[
                                                                    {
                                                                        name: "0-10",
                                                                        value: Math.round(result4[0][0].pnts/summ2*100)
                                                                    },
                                                                    {
                                                                        name: "10-15",
                                                                        value: Math.round(result5[0][0].pnts/summ2*100)
                                                                    },
                                                                    {
                                                                        name: "15-20",
                                                                        value: Math.round(result6[0][0].pnts/summ2*100)
                                                                    },
                                                                    {
                                                                        name: "20-25",
                                                                        value: Math.round(result7[0][0].pnts/summ2*100)
                                                                    }
                                                                    ]
                                                             
                                                                },  
                                                                attemptsData:{
                                                                    data:[
                                                                        {
                                                                            name: "с 1-й попытки",
                                                                            value: counted2[0]
                                                                        },
                                                                        {
                                                                            name:"со 2-й попытки",
                                                                            value: counted2[1]
                                                                        },
                                                                        {
                                                                            name:"с 3-й попытки",
                                                                            value: counted2[2]
                                                                        },
                                                                        {
                                                                            name:"с 4-й попытки и более",
                                                                            value: counted2[3]
                                                                        }
                                                                    ]
                                                                }
                                                                },
                                                    ]
                                                    res.send({data});
                                                    })
                                                    
                                                    
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
    pool.execute("SELECT id, test FROM `tests`")
        .then((result)=>{
            result = result[0]
            var data = []
            result.forEach(item => {
                data.push({
                    id: item.id,
                    name: item.test
                })
            });
            res.send({data})
            console.log("request testList completed successfully")
        })
});


app.listen(
    PORT,
    () => console.log(`it works on http://localhost:${PORT}`)
);
