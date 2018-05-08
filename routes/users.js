var express = require('express');
var router = express.Router();
var allUsers = require('../model/users');

router.get('/list', (req, res) => {

    res.render('users/list', {
        users: allUsers
    })
})
router.get('/list/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);

    var targetUser= '';
    for (var i in allUsers) {
        if (allUsers[i].id == id) {
            targetUser = allUsers[i];
        }
    }
    res.render('users/targetUser', {
        user: targetUser,
        msg: " ",
    })
})
router.get('/login', (req, res) => {

 if(req.session.name){
        res.render('users/successfully_loggedin.ejs',{
            name:req.session.name,
            source:"session",
        })
    }
  else if((req.cookies.name) && (req.cookies.id)){
        res.render('users/successfully_loggedin.ejs',{
            name:req.cookies.name,
            source:"cookies",
        })
    }


    else{
        res.render('users/login.ejs');

    }


})

router.get('/login/:id',(req,res)=>{
    var id = req.params.id;
    var targetUser = '';
    for (var i in allUsers) {
        if (allUsers[i].id == id) {
            targetUser = allUsers[i];

        }
    }
    res.render('users/targetUser', {
        user: targetUser,
        msg : "chat",

    })
})

router.post('/login/check', (req, res) => {
    //login page ht3mlo render l page de
    var id = req.body.id;
    var name =req.body.name;
    var targetUser='';
    for (var i in allUsers) {
        if (allUsers[i].id == id && allUsers[i].name== name) {
            targetUser = allUsers[i];

        }
    }

   if (targetUser==''){
       res.send("invalid ");
   }
   else{
       req.session.name=name;
       req.session.id=id;
       res.cookie('name',req.session.name, { maxAge: 900000, httpOnly: true });
       res.cookie('id',req.session.id, { maxAge: 900000, httpOnly: true });
       console.log(req.session);
       console.log(req.cookies);
        res.redirect(id);
   }

})






module.exports = router;