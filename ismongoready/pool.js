var express = require('express');
var app = express();
var DBConn = require('./mongoConnect');
var db = "";
var collection = "";

var mongodbConfig = {
    "autoReconnect": true,
    "reconnectTries": 10,
    "reconnectInterval": 1000
}


DBConn.connect().then(function (client) {
    db = client.db('checkDB');
    collection = db.collection('tst-data');
    DBConn.close();
}).then(function () {
    app.listen(process.env.PORT || 3000, function () {
        console.log('server is running on port 3000');
    }
    )
}).catch(function (err) {
    console.log('something going wrong\nError Message : ', "Might be Connection not made or" 
        +" Server not yet started");
})


app.get('/', function (req, res) {
    if (collection != "") {
        collection.findOne({}, function (err, result) {
            if (!err) {
                res.send(result);
            }
        })
    }
})


