const getProfile=(req,res,db,bcrypt)=>{

const {id} =req.params;	
db.select ('*') .from('users').where({id})
.then(response=>{
	if(response.length)
	{
	res.json(response[0])
	}
	else
	{
	res.status(400).json('Not Found');
	}
})
.catch(err=>res.status(400).json('Error getting user'));


}

module.exports={
  getProfile:getProfile
};