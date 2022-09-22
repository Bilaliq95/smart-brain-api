const handleSignIn=(req,res,db,bcrypt)=>{
  const {email,password}=req.body;
    if(!email||!password)
  {
    return res.status(400).json('Invalid values provided');
  }
  db.select('*').from('login').where({email}).
  then(user=>{
  	const isValid=bcrypt.compareSync(password,user[0].hash);
  	if(isValid)
  	{
  		db.select('*').from('users').where('email','=',req.body.email)
  		.then(response=>res.send(response[0]))
  		.catch(err=>res.status(400).send('Unable to get User'));
  	}
  	else
  	{
  		res.status(400).send('Wrong Credentials');
  	}
  }).catch(err=>res.status(400).send('User Not Found'))
};

module.exports={
  handleSignIn:handleSignIn
};



