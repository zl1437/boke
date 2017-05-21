var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var db_str='mongodb://localhost:27017/boke'
/* GET home page. */
router.get('/', function(req, res, next) {
//	var title=req.bady['title'];
//	var con=req.body['con'];
	
	mongodb.connect(db_str,function(err,db){
		if(err){
			console.log(err)
		}else{
			finddata(db)
//				res.render('/',{con:result})
//				console.log(result)
			
//			db.close()
		}
		
		
	})
	var finddata=function(db,callback){
		var coll=db.collection('con')
		coll.find({}).toArray(function(err,result){
			if(!err){
				res.render('index', { title: 'Express' ,user:req.session.user,con:result});
			}
		})
	}
	
	
  
});
router.get('/register',function(req,res,next){
	res.render('register',{})
})

router.get('/login',function(req,res,next){
	res.render('login',{})
})
router.get('/relogin',function(req,res,next){
	// req.session.username=undefined;
	req.session.destroy(function(err){
		if (err) {
			console.log(err)
		}else{
			res.redirect('/')
		}
	})
	res.render('relogin',{})
})

router.get('/liuyan',function(req,res,next){
	res.render('liuyan',{})
})



module.exports = router;
