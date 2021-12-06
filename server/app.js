require('dotenv').config()
const express = require('express')
const app = express();
const httpServer = require("http").createServer(app);
const options = {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
};

const PORT = process.env.PORT || 8080
const pool = require('./config/database') //db
const io = require("socket.io")(httpServer, options);

const file = require('file-system');
const fs = require("fs");
const fastcsv = require("fast-csv");

io.on("connection", socket => {
    console.log(`Server Connected to Socket ${socket.id}`)



    socket.on('getRecordSummary', () => {
        console.log('getRecordSummary ')

        pool.query('SELECT COUNT(*) AS duplicated, (SELECT COUNT(*) FROM leaders) AS total FROM `leaders` AS l INNER JOIN(SELECT `id`, `fname`, `mname`, `lname`,`suffix`, `contact_no`, `precinct_no`, `address` FROM leaders HAVING COUNT(*) > 1) ll ON ll.fname = l.fname OR ll.lname = l.lname OR ll.contact_no = l.contact_no OR ll.address = l.address',
            [],
            (err, rows, fields) => {
                if (rows == null) {
                    console.log('No Data Found!')
                    // console.log(rows)
                    socket.emit('receivedRecordSummary', null)
                } else {
                    socket.emit('receivedRecordSummary', rows)
                    console.log(rows)
                }
                if (err) console.error("Boss we got an error with: ", err)
                console.log('.....')
            })
    })

    socket.on('getFilteredMasterlist', data => {
        console.log('getFilteredMasterlist ' + data)

        pool.query('SELECT `id`, `fname`, `mname`, `lname`,`suffix`, `contact_no`, `precinct_no`, `address` FROM `leaders`',
            [],
            (err, rows, fields) => {
                if (rows.length == 0) {
                    console.log('No Data Found!')
                    // console.log(rows)
                    socket.emit('receivedFilteredMasterlist', null)
                } else {
                    socket.emit('receivedFilteredMasterlist', rows)
                    console.log(rows)
                }
                if (err) console.error("Boss we got an error with: ", err)
                console.log('.....')
            })
    })

    socket.on('getMasterlist', data => {
        console.log('getMasterlist ' + data)

        const slowSubquery = "SELECT `id`, `fname`, `mname`, `lname`,`suffix`, `contact_no`, `precinct_no`, `address` FROM `leaders` AS l WHERE EXISTS(SELECT * FROM leaders AS ll WHERE ll.fname = l.fname OR ll.lname = l.lname OR ll.contact_no = l.contact_no OR ll.address = l.address OR ll.precinct_no = l.precinct_no HAVING COUNT(*) > 1)";
        const failQuery = "SELECT l.id, l.fname, l.mname, l.lname, l.suffix, l.contact_no, l.precinct_no, l.address FROM `leaders` AS l INNER JOIN(SELECT `id`, `fname`, `mname`, `lname`,`suffix`, `contact_no`, `precinct_no`, `address` FROM leaders HAVING COUNT(*) > 1) ll ON ll.fname = l.fname OR ll.lname = l.lname OR ll.contact_no = l.contact_no OR ll.address = l.address GROUP BY l.id ORDER BY l.id";
        const fastQuery = "SELECT l.id, l.fname, l.mname, l.lname, l.suffix, l.contact_no, l.precinct_no, l.address FROM `leaders` AS ll, `leaders` AS l WHERE ll.fname = l.fname OR ll.lname = l.lname OR ll.contact_no = l.contact_no OR ll.address = l.address GROUP BY id HAVING COUNT(*) > 1";
        const uyaNa = "SELECT l.id, l.fname, l.mname, l.lname, l.suffix, l.contact_no, l.precinct_no, l.address FROM `leaders` AS l INNER JOIN( SELECT `id`, `fname`, `lname`, `suffix`, `contact_no`, `address` FROM `leaders` GROUP BY fname HAVING COUNT(*) > 1 ) ll ON ll.fname = l.fname OR ll.lname = l.lname OR ll.contact_no = l.contact_no OR ll.address = l.address";

        const filterFname = "SELECT l.id, l.fname, l.mname, l.lname, l.suffix, l.contact_no, l.precinct_no, l.address FROM `leaders` AS l INNER JOIN(SELECT `fname` FROM leaders GROUP BY fname HAVING COUNT(fname) > 1) ll ON ll.fname = l.fname ORDER BY l.fname ASC";
        const filterLname = "SELECT l.id, l.fname, l.mname, l.lname, l.suffix, l.contact_no, l.precinct_no, l.address FROM `leaders` AS l INNER JOIN(SELECT `lname` FROM leaders GROUP BY lname HAVING COUNT(lname) > 1) ll ON ll.lname = l.lname ORDER BY l.lname ASC";
        const filterContact = "SELECT l.id, l.fname, l.mname, l.lname, l.suffix, l.contact_no, l.precinct_no, l.address FROM `leaders` AS l INNER JOIN(SELECT `contact_no` FROM leaders GROUP BY contact_no HAVING COUNT(contact_no) > 1) ll ON ll.contact_no = l.contact_no ORDER BY l.contact_no ASC";
        const filterAddress = "SELECT l.id, l.fname, l.mname, l.lname, l.suffix, l.contact_no, l.precinct_no, l.address FROM `leaders` AS l INNER JOIN(SELECT `address` FROM leaders GROUP BY address HAVING COUNT(address) > 1) ll ON ll.address = l.address ORDER BY l.address ASC";
        if (data == "First Name") {
            pool.query(filterFname,
                [],
                (err, rows, fields) => {
                    console.log("getMasterlist", rows)
                    if (rows == null) {
                        console.log('No Data Found!')
                        // console.log(rows)
                        socket.emit('receivedMasterlist', null)
                    } else {
                        socket.emit('receivedMasterlist', rows)
                        console.log(rows)
                    }
                    if (err) console.error("Boss we got an error with: ", err)
                    console.log('.....')
                })
        } else if (data == "Last Name") {
            pool.query(filterLname,
                [],
                (err, rows, fields) => {
                    console.log("getMasterlist", rows)
                    if (rows == null) {
                        console.log('No Data Found!')
                        // console.log(rows)
                        socket.emit('receivedMasterlist', null)
                    } else {
                        socket.emit('receivedMasterlist', rows)
                        console.log(rows)
                    }
                    if (err) console.error("Boss we got an error with: ", err)
                    console.log('.....')
                })
        }
        else if (data == "Contact Number") {
            pool.query(filterContact,
                [],
                (err, rows, fields) => {
                    console.log("getMasterlist", rows)
                    if (rows == null) {
                        console.log('No Data Found!')
                        // console.log(rows)
                        socket.emit('receivedMasterlist', null)
                    } else {
                        socket.emit('receivedMasterlist', rows)
                        console.log(rows)
                    }
                    if (err) console.error("Boss we got an error with: ", err)
                    console.log('.....')
                })
        } 
        else if (data == "Address") {
            pool.query(filterAddress,
                [],
                (err, rows, fields) => {
                    console.log("getMasterlist", rows)
                    if (rows == null) {
                        console.log('No Data Found!')
                        // console.log(rows)
                        socket.emit('receivedMasterlist', null)
                    } else {
                        socket.emit('receivedMasterlist', rows)
                        console.log(rows)
                    }
                    if (err) console.error("Boss we got an error with: ", err)
                    console.log('.....')
                })
        }else{
            socket.emit('receivedMasterlist', null)
        }


    })
    socket.on('onUploadCsv', filename => {
        console.log("CSV Uploading...", filename);
        let stream = fs.createReadStream("../public/img/" + filename + "");
        let csvData = [];

        let csvStream = fastcsv.parse().on("data", function (data) {
            excelData = [...data.slice(0, 1), ...data.slice(1, 10)];
            csvData.push(excelData);
        }).on("end", function () {
            // remove the first line: header
            csvData.shift();
            console.log("Final CSV Data", csvData)
            pool.query('INSERT INTO `leaders`(`fname`, `mname`, `lname`,`suffix`, `contact_no`, `precinct_no`, `address`) VALUES ?',
                [
                    csvData
                ],
                (err, rows, fields) => {
                    console.log("rows", rows)
                    if (err) console.error("Boss we got an error with: ", err)
                    console.log('.....')
                })

        });
        stream.pipe(csvStream);
    })

    socket.on('deleteRecord', data => {
        console.log('deleteRecord ' + data)
        let address = data[7];
        console.log("address", address);
        const deleteQ = "DELETE FROM leaders WHERE id=? AND fname=? AND mname=? AND lname=? OR suffix=? AND contact_no=? AND precinct_no=? AND address=? ";
        const deleteById = "DELETE FROM leaders WHERE id=?";
        pool.query(deleteById,
            [
                data[0]
                // data[1],
                // data[2],
                // data[3],
                // data[4],
                // data[5],
                // data[6],
                // address
            ],
            (err, rows, fields) => {

                //socket.emit('receivedMasterlist',rows)
                console.log('Deleted Successfully')
                console.log(rows)
                socket.emit('onReloadMasterlist')

                if (err) console.error("Boss we got an error with: ", err)
                //socket.emit('receivedMasterlist',rows)
                console.log('Deleted Successfully')
                // console.log(rows)
                //  socket.emit('receivedMasterlist')
                console.log('.....')
            })

        pool.query('INSERT INTO `deleted_records`( `fname`, `mname`, `lname`,`suffix`, `contact_no`, `precinct_no`, `address`) VALUES (?,?,?,?,?,?,?)',
            [
                // data[0],
                data[1],
                data[2],
                data[3],
                data[4],
                data[5],
                data[6],
                address
            ],
            (err, rows, fields) => {
                console.log('Soft Delete Successfully')
                console.log(rows)
                if (err) console.error("Boss we got an error with: ", err)
                console.log('Soft Delete Successfully')
                console.log('.....')
            })

    })

    socket.on('getDeletedRecord', data => {
        console.log("getDeletedRecord", data)
        pool.query('SELECT `id`,`fname`, `mname`, `lname`,`suffix`, `contact_no`, `precinct_no`, `address` FROM `deleted_records`',
            [],
            (err, rows, fields) => {
                if (rows.length == 0) {
                    console.log('No Data Found!')
                    // console.log(rows)
                    socket.emit('receivedDeletedRecords', null)
                } else {
                    socket.emit('receivedDeletedRecords', rows)
                    console.log(rows)
                }
                if (err) console.error("Boss we got an error with: ", err)
                console.log('.....')
            })
    })

});



httpServer.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));