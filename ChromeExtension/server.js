
var express =require('express');
var app=express();

 var mongojs = require('mongojs');
 var db = mongojs('urlDb', ['urlDb']);
 var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/urlHitCount',function(req,res){
res.json("conctList");
var urlName =req.query.urlName;
console.log("some one hiting server with ", req.url);
db.urlDb.findOne({"url":urlName},{},function(err,docs){

            if(docs == null){
console.log("No Records found in DB for this url");
           var urlDocument={
	           'url':urlName,
	           'count':'1',
	             'lastHitTime':new Date()
                         }
                         console.log("inserting new record with details "+urlDocument);
          db.urlDb.insert(urlDocument);
          console.log("successfully inserted in DB");
            }
            if(docs != null){

            	console.log("Alreday exsist in DB having count = "+docs.count);
            	console.log(docs);
            	var updatedCount=parseInt(docs.count)+1;
          // db.urlDb.update(urlDocument);
           db.urlDb.update({'url':urlName},{$set:{'count':updatedCount,'lastHitTime':new Date()}})
           console.log("successfully updated  in DB with "+"count =" +updatedCount);
            }

            });
});

app.listen(3000);
console.log("node server has been started successfully");
console.log("wating for request ............................");