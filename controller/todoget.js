var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;


var url = 'mongodb://localhost:27017/todolist';
var ObjectId = require('mongodb').ObjectID;

exports.getting= function(req, res) {
    console.log("harine");

    // Use connect method to connect to the Server
    MongoClient.connect(url).then(function (db) {
            var collection = db.collection('work');
            collection.remove({"done":true}).then(function(result) {
                    console.log('4545');

                    collection.find({"done":false}).toArray(function(err, docs){
                        console.log("retrieved records3:");
                        res.json(docs);
                    });
            }).catch(function (err) {
                console.log('Error...');
            });
    }).catch(function (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    });


};
exports.adding= function(req, res) {
    console.log('Connection established to');
    var tododone=false;
    var todotext=req.body.todoText;



    MongoClient.connect(url).then(function(db){
            console.log('Connection established to', url);
            var collection = db.collection('work');
            collection.insert([{done: tododone,name:todotext}]).then(function(result) {
                console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
            }).catch(function (err) {
                console.log(err);
            });
            collection.find().toArray(function(err, docs){
                console.log("retrieved records4:");
                res.json(docs);
            });
        //}
    }).catch(function (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    });
};

exports.removing= function(req, res) {
    console.log('Connection established to');
    console.log(req.params.id.toString());

// Use connect method to connect to the Server
    MongoClient.connect(url).then(function(db) {
            console.log('Connection established to', url);
            var collection = db.collection('work');
            collection.remove({"_id":ObjectId(req.params.id.toString())}).then(function(result) {
                    console.log('Iremove');
                    collection.find().toArray(function(err, docs){
                        console.log("retrieved records3-1:");
                        res.json(docs);
                    });
            }).catch(function (err) {
                console.log('ooooo');
            });
    }).catch(function (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    });
};

exports.updating= function(req, res) {
    console.log('Connection established to');


    console.log(req.params.id.toString());

// Use connect method to connect to the Server
    MongoClient.connect(url).then(function(db) {
            console.log('Connection established to', url);
            var collection = db.collection('work');
            collection.update({"_id":ObjectId(req.params.id.toString()),"done":false},
                {
                    $set: { "done":true}
                },
                { upsert: true}).then(function(result) {
                    collection.find().toArray(function(err, docs){
                        console.log("retrieved records3-1:");
                        res.json(docs);
                    });

                }).catch(function (err) {
                collection.update({"_id":ObjectId(req.params.id.toString())},
                    {
                        $set: { "done":false}
                    },
                    { upsert: true}).then(function(result) {
                            console.log('Iremove');
                            collection.find().toArray(function(err, docs){
                                console.log("retrieved records3-1:");
                                res.json(docs);
                            });
                    }).catch(function (err) {
                    console.log('5050');
                });
            });
    }).catch(function (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    });
};

exports.all= function(req, res){
    console.log('Connection established to');

// Use connect method to connect to the Server
    MongoClient.connect(url).then(function(db) {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('work');

            // Insert some users

            collection.find().toArray(function(err, docs){
                console.log("retrieved records8888:");
                res.json(docs);
            });
    }).catch(function (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    });


};
exports.archive= function(req, res) {
    console.log('Connection established to');


    //console.log(req.params.id.toString());

// Use connect method to connect to the Server
    MongoClient.connect(url).then(function(db) {
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
    }).catch(function (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    });

};