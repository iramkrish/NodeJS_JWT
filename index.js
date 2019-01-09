const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res)=>{
res.json({
    message:'get'
    });
});

app.post('/api/posts',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authdata)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message:'post',
                authdata
            });
        }
    });

});

app.post('/api/login',(req,res)=>{
    const user ={
        id : 1,
        username : "ram",
        email : "iramkrish95@gmail.com"
    }

    jwt.sign({user},'secretkey',{expiresIn:'30s'},(err,token)=>{
        res.json({
            token
        });
    });
});

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}

app.listen('5000');