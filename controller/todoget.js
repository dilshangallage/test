var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;


var url = 'mongodb://localhost:27017/todolist';
var ObjectId = require('mongodb').ObjectID;

exports.getting= function(req, res) {
    console.log("harine");

    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            var collection = db.collection('work');
            collection.remove({"done":true},function (err, result) {

                if (err) {
                    console.log('ooooo');
                } else {
                    console.log('4545');

                    collection.find({"done":false}).toArray(function(err, docs){
                        console.log("retrieved records3:");
                        res.json(docs);
                    });
                }


            });


        }
    });


};
exports.adding= function(req, res) {
    console.log('Connection established to');
    var tododone=false;
    var todotext=req.body.todoText;



    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {

            console.log('Connection established to', url);


            var collection = db.collection('work');


            collection.insert([{done: tododone,name:todotext}], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                }


            });
            collection.find().toArray(function(err, docs){
                console.log("retrieved records4:");
                res.json(docs);
            });
        }
    });


};
exports.removing= function(req, res) {
    console.log('Connection established to');


    console.log(req.params.id.toString());

// Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {

            console.log('Connection established to', url);


            var collection = db.collection('work');


            console.log('llll');

            collection.remove({"_id":ObjectId(req.params.id.toString())},function (err, result) {

                if (err) {
                    console.log('ooooo');
                } else {
                    console.log('Iremove');
                    collection.find().toArray(function(err, docs){
                        console.log("retrieved records3-1:");
                        res.json(docs);
                    });
                }
                //Close connection

            });
        }
    });


};
exports.updating= function(req, res) {
    console.log('Connection established to');


    console.log(req.params.id.toString());

// Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('work');

            //Create some users
            //var work = {done: tododone,name:todotext};
            console.log('llll');


            collection.update({"_id":ObjectId(req.params.id.toString()),"done":false},
                {
                    $set: { "done":true}
                },
                { upsert: true},function (err, result) {

                    if (err) {
                        console.log('0101010');
                        collection.update({"_id":ObjectId(req.params.id.toString())},
                            {
                                $set: { "done":false}
                            },
                            { upsert: true},function (err, result) {

                                if (err) {
                                    console.log('5050');
                                } else {
                                    console.log('Iremove');
                                    collection.find().toArray(function(err, docs){
                                        console.log("retrieved records3-1:");
                                        res.json(docs);
                                    });
                                }
                                //Close connection

                            });

                    } else {
                        console.log('Iremove');
                        collection.find().toArray(function(err, docs){
                            console.log("retrieved records3-1:");
                            res.json(docs);
                        });
                    }
                    //Close connection

                });
        }
    });


};
exports.all= function(req, res){
    console.log('Connection established to');


    //console.log(req.params.id.toString());

// Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('work');

            //Create some users
            //var work = {done: tododone,name:todotext};
            console.log('llll');

            // Insert some users

            collection.find().toArray(function(err, docs){
                console.log("retrieved records8888:");
                res.json(docs);
            });
        }
    });


};
exports.archive= function(req, res) {
    console.log('Connection established to');


    //console.log(req.params.id.toString());

// Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('work');

            //Create some users
            //var work = {done: tododone,name:todotext};
            console.log('llll');

            // Insert some users

            collection.find({"done":false}).toArray(function(err, docs){
                console.log("retrieved records8787:");
                res.json(docs);
            });
        }
    });

};