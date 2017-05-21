var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var db_str='mongodb://localhost:27017/boke'

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/form',function(req,res,next){

	//获取数据
	var user=req.body['user']
	var pass=req.body['pass']
	var email=req.body['email']


	mongodb.connect(db_str,function(err,db){
		if (err) {
			console.log(err)

		}else{
			console.log('连接成功')
			//调用插入函数
			inserdata(db,function(result){
				console.log(result)
			})
			res.redirect('/')
			res.render('index',{user:req.session.user})
			db.close()
		}
	})

	var inserdata=function(db,callback){
		var coll=db.collection('register')
		var data=[{user:user,pass:pass,email:email}]
		coll.insert(data,function(err,result){
			if (err) {
				console.log(err)
			}else{
				callback(result)
			}
		})
	}




})


router.post('/login',function(req,res,next){

	//获取数据
	var user=req.body['user']
	var pass=req.body['pass']
	


	

	var finddata=function(db,callback){
		var coll1=db.collection('register')
		var data={user:user,pass:pass}
		// coll1.find(data,function(err,result){
		// 	if (err) {
		// 		console.log(err)
		// 	}else{
		// 		callback(result)
		// 	}
		// })

		coll1.find(data).toArray(function(err,result){
				callback(result)
		})
	}

	mongodb.connect(db_str,function(err,db){
		if (err) {
			console.log(err)

		}else{
			console.log('连接成功1111')
			//调用查询函数
			finddata(db,function(result){
					// console.log(result)
					if (result.length>0) {
//						res.send('登陆成功')
						req.session.user=result[0].user
						res.redirect('/')
						db.close()
					}else{
						res.send('账号密码不正确')
					}


			})
			
		}
	})




})


router.post('/list', function(req, res, next) {
	/*optional stuff to do after success */
	var user=req.session.user;
	if (user) {

	var biaoti=req.body['biaoti']
	var con=req.body['con']


	mongodb.connect(db_str,function(err,db){
		if (err) {
			console.log(err)

		}else{
			// console.log('连接成功')
			//调用插入函数
			insert(db,function(result){
				console.log(result)
				res.redirect('/users/showlist')
				db.close()
			})
			// res.send('注册成功')
			
		}
	})

	var inserdata=function(db,callback){
		var coll2=db.collection('message')
		var data=[{biaoti:biaoti,con:con}]
		coll2.insert(data,function(err,result){
			if (err) {
				console.log(err)
			}else{
				callback(result)
			}
		})
	}



	}else{
		res.send('session过期了')
	}
});
//显示留言数据
router.get('/showlist',function(req,res,next){
	var user=req.body['user']
	var pass=req.body['pass']
	


	

	var finddata=function(db,callback){
		var coll3=db.collection('register')
		
		

		coll3.find({}).toArray(function(err,result){
				callback(result)
		})
	}

	mongodb.connect(db_str,function(err,db){
		if (err) {
			console.log(err)

		}else{
			console.log('连接成功1111')
			//调用查询函数
			finddata(db,function(result){
					
					res.render('showlist',{shuju:result})

			})
			
		}
	})

})



module.exports = router;
