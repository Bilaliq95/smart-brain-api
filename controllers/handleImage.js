const Clarifai=require('clarifai');


const app = new Clarifai.App({
 apiKey: '37e15d7f82584b0f9b92204d738909eb'
});




const handleImage=(req,res,db)=>{
	const {id}=req.body;
	db('users').where('id','=',id)
	.increment('entries',1).
	returning('entries')
	.then(entries=>{
		console.log(entries)
		res.json(entries[0])
	}).
	catch(err=>res.status('400'))

}


const handleApiCall=(req,res)=>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input).then(data=>{
		res.json(data);
	})
	.catch(err=>res.status(400).json('unable to work with API'));
}

module.exports={
  handleImage:handleImage,
  handleApiCall:handleApiCall
};