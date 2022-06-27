const router = require('express').Router();
const User = require('../datastore/User') ;
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// Registration 

router.post('/signup', async (req, res) => {
    const newUser = new User({
        username :  req.body.username,
        email    :  req.body.email,
        password :  CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try{
        const savedUser= await newUser.save();
        res.status(200).json(savedUser);

    }catch(err) {
        res.status(500);
    }

});


// Signin

router.post('/signin', async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
            res.status(401).json('wrong user');
        }
        const originalPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);

        if(originalPassword !== req.body.password){
            res.status(401).json('wrong password');
        }
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_SEC,
            {expiresIn: "3d"}
        );

        const {password, ...others} = user._doc;
        res.status(200).json({...others, accessToken});


    }
    catch(err){
        res.status(500);
    }
});



module.exports = router;




