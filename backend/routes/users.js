const router = require('express').Router();
const Users = require('../models/users.model');


//fetches all users data
router.route('/').get((req, res) => {
  Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


//creating user || registering user
router.route('/add').post((req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  Users.exists({id:id}).then(exists=>{
    if(!exists){
      console.log("id",id);
      const newUser = new Users({id,username});
      newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
      res.json("user already exists");
      console.log(exists,"user already exist in mongodb");
    }
  }).catch(err=>{
    console.log(err);
  })
});


//saves right swiped cards of a user
router.route('/addupdate').post((req, res) => {
  //const username = req.body.username;
  const  userId =req.body.id;
  const favdata = req.body.favdata;
    Users.findOneAndUpdate({id:userId},{"$addToSet":{"favdata":req.body.favdata}},
    { "new": true, "upsert": true }).then(() => res.json('favdata  updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//saves right swiped cards of a user
router.route('/favmovies').post((req, res) => {
  const  userId =req.body.id;
  Users.findOne({id:userId})
    .then(user=>{
      res.send(user)
    })
});



//removes right swiped cards of a user from list
router.route('/removeupdate').post((req, res) => {
  //const username = req.body.username;
  const  userId =req.body.id;
  const  favdata = req.body.favdata;
    Users.findOneAndUpdate({id:userId},{ "$pull": { "favdata":req.body.favdata} },
    { "new": true, "upsert": true }).then(() => res.json('favdata  updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;