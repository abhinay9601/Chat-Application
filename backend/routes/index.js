var express = require('express');
var router = express.Router();

var AgentUser = require('../models/agentUserModel');
var SetupUrl = require('../models/setupUrlMode');
var User = require('../models/UserModel');

// Login Register Routes
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: 'Login Successfull', user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: 'User not registered' });
    }
  });
});

//  Register route

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: 'User already registerd' });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: 'Successfully Registered, Please login now.' });
        }
      });
    }
  });
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//list all users
router.get('/list-user', async (req, res) => {
  try {
    const data = await AgentUser.find();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});

//create user
router.post('/add-user', async (req, res) => {
  // console.log('hello check');
  const { name, email, address, phoneNo, department } = req.body;
  try {
    const data = await AgentUser.create({
      name,
      email,
      address,
      phoneNo,
      department,
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(304).send('Duplicate email id exist');
  }
});

// Update User details by using id
router.post('/add-user/:id', async (req, res) => {
  const { name, email, address, phoneNo, department } = req.body;
  console.log(name, email, address, phoneNo, department);
  try {
    const data = await AgentUser.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        email,
        address,
        phoneNo,
        department,
      }
    );
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});

//Setup page url
router.get('/setup-url/:id', async (req, res) => {
  try {
    const data = await SetupUrl.findById({ _id: req.params.id });
    // console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(304).send(error);
  }
});
router.post('/setup-url/:id', async (req, res) => {
  try {
    const data = await SetupUrl.findByIdAndUpdate(
      { _id: req.params.id },
      { url: req.body.url }
    );
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(304).send(error);
  }
});

// Edit setup page url

module.exports = router;
