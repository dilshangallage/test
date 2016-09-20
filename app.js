var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
var path = require('path');


app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


///export all routert files/////

var api = require('./controller/todoget.js');


/////// add todolist///////

app.get('/todo', api.getting);


//// add element////
app.post('/todo',api.adding);


//// remove elements////
app.post('/remove:id',api.removing);


//// checked elements////
app.post('/update:id',api.updating);

//// all elements////
app.post('/all',api.all);

///// not todo work only //////
app.post('/archive',api.archive);

app.listen(3000,function(){
    console.log("Started on PORT 3000");
});