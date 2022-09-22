const handleRegister=(req,res,db,bcrypt)=>{
	const {name,email,password}=req.body;
	if(!email||!password|| !name)
	{
		return res.status(400).json('incorrect form submission');
	}
	console.log('In register');
	const hash=bcrypt.hashSync(password,10);
	db.transaction(trx=>{
		trx.insert({
			hash:hash,
			email:email
		}).into('login')
		.returning('email').
		then(LoginEmail=>{
		console.log(LoginEmail)	
		return trx('users').returning('*').insert({
		email:LoginEmail[0].email,
		name:name,
		joined: new Date()
	}).then(users=>res.json(users[0]))
  }).then(trx.commit).catch(trx.rollback)
})
	.catch(err=>res.status(400).json('unable to register'));
};


module.exports={
	handleRegister:handleRegister
};