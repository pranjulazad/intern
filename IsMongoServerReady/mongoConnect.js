var mongoclient = require('mongodb').MongoClient;
//var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var sleep = require('sleep');

var countToTry = 5;
var countsDone = 0;
var isPending = true;
var conn;

function getConnect() {
    countsDone++;
    console.log("trying---", countsDone);
    sleep.sleep(10);

    conn = new Promise((resolve) => {
        mongoclient.connect(url, (err, client) => {
            if (err) {
                console.log("Showing some server problem");
                resolve(0);
            } else {
                isPending = false;
                //console.log("way2");
                resolve(client);
            }
        })
    })

    //console.log('this 1');
    return conn;
}

/*async function connectToDB() {

    var conn = new Promise((resolve, reject) => {
        while (isPending && countsDone <= countToTry) {

            var checkValue = connectToDB();

            if (checkValue != 0) {
                isPending = false;
                resolve(checkValue);
            }
        }
        reject("NoConnection");
    })

    var rec = await getConnect();


    return rec;
}*/

////open method

async function open() {
    while (isPending != false && countsDone < countToTry) {
        conn = await getConnect();
        console.log("okk");
    }
    console.log("why this");
    return conn;
}

function close(db) {
    if (db) {
        db.close();
    }
}

make = {
    connect: open,
    close: close
}

module.exports = make;