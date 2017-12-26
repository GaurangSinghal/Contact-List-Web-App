var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db=mongojs('contactlist',['contactlist']);
// 1st parameter describes the connectionString and 2nd parameter describes the collection
var bodyParser=require('body-parser');
app.use(express.static(__dirname+"/public"))
/* static is to tell that we are loading static files like html, css, js */
app.use(bodyParser.json());

app.get('/contactlist',function(req,res)
{	console.log("I received a get request");
	db.contactlist.find(function(err,docs)
	{	console.log(docs);
		res.json(docs);		
	})
	
});

app.post('/contactlist', function(req,res) // Add Contact button
{	console.log(req.body);	
	db.contactlist.insert(req.body,function(err,doc)
	{	res.json(doc);		
	})
});

app.delete('/contactlist/:id', function(req,res) // Remove button
{	var id=req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectID(id)},function(err,doc)
	{	res.json(doc);		
	})
});

app.get('/contactlist/:id', function(req,res) // Edit button
{	var id=req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectID(id)},function(err,doc)
	{	res.json(doc);		
	})
});

app.put('/contactlist/:id', function(req,res) // Update button
{	var id=req.params.id;
	console.log(req.body.name);		
	db.contactlist.findAndModify(
	{	query: { _id: mongojs.ObjectID(id)},
		update:{ $set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new:true
	}, function(err,doc)
	{	res.json(doc);		
	})
});

app.get('/hello',function(req,res)
{	db.contactlist.find(function(err,data)
	{	res.json(data);	
	});
	
});

app.listen(3000);
console.log("Server running on port 3000");