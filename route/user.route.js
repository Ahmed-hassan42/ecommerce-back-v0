const express = require('express');
const router = express.Router();
const {addUser,login} = require('../controller/user.controller');

router.get('/', (req,res) =>{
    res.status(200).json({message: 'user route works'}) 
})

router.post('/register', addUser)
router.post('/login',login);

module.exports = router;