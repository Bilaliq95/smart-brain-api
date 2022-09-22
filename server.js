const express=require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const knex=require('knex');
const bcrypt = require('bcrypt');
const register=require('./controllers/register');
const signin=require('./controllers/signIn');
const getProfile=require('./controllers/getProfile');
const handleImage=require('./controllers/handleImage');

const db=knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		user:'muhammadbilal',
		password:'',
		database:'smart-brain'
	}
})



const app=express();
app.use(bodyParser.json());
app.use(cors());

const users=[

{
	id:'123',
	name:'Bilal',
	email:'bilal@gmail.com',
	password:'bananas',
	entries:0,
	joined:new Date()
},

{
	id:'124',
	name:'Iqbal',
	email:'iqbal@gmail.com',
	password:'cookies',
	entries:0,
	joined:new Date()
}

];


app.get('/',(req,res)=>{
res.send(users);

});

app.post('/signin',(req,res)=>{
signin.handleSignIn(req,res,db,bcrypt);
});



app.post('/register',(req,res)=>{
  register.handleRegister(req,res,db,bcrypt);
});



app.get('/profile/:id',(req,res)=>{
	getProfile.getProfile(req,res,db,bcrypt);
});

app.put('/image',(req,res)=>{
	handleImage.handleImage(req,res,db);
});

app.put('/imageurl',(req,res)=>{
	handleImage.handleApiCall(req,res);
});



app.listen(3000,()=>{
	console.log('This server is running');
})