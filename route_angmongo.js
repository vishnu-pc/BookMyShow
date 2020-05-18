
var express = require('express');  
var bodyParser = require('body-parser'); 
var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient;
var app = express();  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const path = require('path')

// Connect to the db 
MongoClient.connect("mongodb://127.0.0.1/BookMyShow", function(err, db) {
 if(!err) {
    console.log("Connected to BookMyShow Database");

/*JS client side files has to be placed under a folder by name 'public' */
app.use(express.static('public')); //making public directory as static directory  
app.use(bodyParser.json());

app.get('/', function (req, res) {  
   console.log("Got a GET request for homepage");  
   res.send('<h1>HelloWorld!</h1>');  
})

app.get('/index.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );    
})  

app.get('/insert.html', function (req, res) {
    res.sendFile( __dirname + "/" + "insert.html" );
})

//...............Authenticaltion........................................................

app.get("/authenticate", function(req, res) {
 
 var username = req.query.usr;
 var password = req.query.pwd;

   if((username == "vishnupc1999")&&(password == "open1234")) {
    res.sendFile('C:/Users/Vishnu/Desktop/Code/BookMyShow/public/main.html');
   } 
   else {
    res.send("C:/Users/Vishnu/Desktop/Code/BookMyShow/public/index.html");
   }
 });

/* to access the posted data from client using request body (POST) or request params(GET) */
//-----------------------POST METHOD-------------------------------------------------
app.post('/process_post', function (req, res) {
    /* Handling the AngularJS post request*/
    console.log("Inserted Succesfully: "+JSON.stringify(req.body));
  res.setHeader('Content-Type', 'text/html');
    /*response has to be in the form of a JSON*/
    req.body.serverMessage = "Added Succesfully"
    /*adding a new field to send it to the angular Client */
    //console.log("Sent data are (POST):usn :"+req.body.usn+"  name="+req.body.name+"cgpa:"+req.body.cgpa+"12th per"+req.body.per+"backlog"+req.body.bck+"semester"+req.body.sem+"extra curicular"+req.body.exc);
    // Submit to the DB
    var Eno = parseInt(req.body.Eno);
    var Ename = req.body.Ename;
    var loc = req.body.loc;
    var date = req.body.date;
  db.collection('Event').insert({Eno:Eno,Ename:Ename,loc:loc,date:date});
    res.end("Your ticket has been purchased succesfully");
    /*Sending the respone back to the angular Client */
});


//--------------UPDATE------------------------------------------
app.get('/update.html', function (req, res) {
    res.sendFile( __dirname + "/" + "update.html" );
})

app.get("/update", function(req, res) {
  var Eno = parseInt(req.query.Eno);
  var date = req.query.date
 
  db.collection('Event', function (err, data) {
        data.update({"Eno": Eno} , {$set:{"date": date}},{multi:true},
            function(err, result){
        if (err) {
          console.log("Failed to update data.");
      } else {
        res.send(result);
        console.log("Event Time Updated")
      }
        });
    });
})  

//...............search........................................................
app.get('/search.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "search.html" );    
})

app.get("/search", function(req, res) {
  
  var Eno = parseInt(req.query.Eno);
    db.collection('Event').find({"Eno":Eno}).toArray(function(err, docs) {
    if (err) {
      console.log(err.message+ "Failed to get data.");
    } else {
      res.status(200).json(docs);
    }
  });
  });
   
//--------------DELETE------------------------------------------//
app.get('/delete.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "delete.html" );    
})

app.get("/delete", function(req, res) {
 
  var Eno = parseInt(req.query.Eno);
  db.collection('Event', function (err, data) {
        data.remove({"Eno" : Eno}, function(err, result){
        if (err) {
          console.log("Failed to remove data.");
      } else {
        res.send(result);
        console.log("Ticket Deleted for Event no -> "+Eno)
      }
        });
    });
    
  });

app.get('/display', function (req, res) { 
//-----DISPLAY IN JSON FORMAT  -------------------------
/*db.collection('Event').find({}).toArray(function(err, docs) {
    if (err) {
      console.log("Failed to get data.");
    } else 
  {
    res.status(200).json(docs);
    }
  });
*/
//-------------DISPLAY USING EMBEDDED JS -----------
db.collection('Event').find().sort({Eno:1}).toArray(
    function(err , i){
        if (err) return console.log(err)
        res.render('disp.ejs',{Event: i})  
     })
     //---------------------// sort({empid:-1}) for descending order -----------//
}) 

app.get('/help', function (req, res) {  
   console.log("Got a GET request for /help");  
   res.send('BookMyShow can help you find tickets on literally anything you wish for!');  
})  
 
var server = app.listen(3000, function () {    
var port = server.address().port  
console.log("listening on http://localhost:%s/", port)  
})  
}
else
{   db.close();  }
  
});
