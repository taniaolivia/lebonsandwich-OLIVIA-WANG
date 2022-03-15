const db = require('../knex.js');
const uuid = require('uuid');
const express = require('express');
const router = express.Router();
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signin', async (req, res) => {
    let users;
    let user;

    try{
        if(req.headers.authorization)
        {
            const base64Credentials = req.headers.authorization.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            [nom, passwd] = credentials.split(':');

            users = await db.select('nom_client', 'passwd').from('client');
           
            user = users.find(u => u.nom_client === nom && u.passwd == passwd);

            if(!user)
            {
                return res.status(401).json({
                    error: "Bad credentials"
                })
            }
            else{
                token = jwt.sign({nom}, 'my_secret_key', {algorithm: 'HS256', expiresIn: '600s'});
    
                return res.status(201).json({
                    token: token
                });
            }
        }
        else{
            return res.status(401).json({
                error: "Missing credential"
            })
        }
    }
    catch(error){
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"
        });
    }
});

router.post('/signup', async (req, res) => {
    let user;

    try{
        if(req.headers.authorization)
        {
            const base64Credentials = req.headers.authorization.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            [nom, passwd] = credentials.split(':');

            user = await db("client").insert({
                nom_client: req.headers.nom,
                mail_client: req.headers.mail,
                passwd: req.headers.passwd
            });
         
            token = jwt.sign({nom}, 'my_secret_key', {algorithm: 'HS256', expiresIn: '600s'});
    
            return res.status(201).json({
                user: req.headers.nom,
                token: token
            });
        }
        else{
            return res.status(401).json({
                error: "Missing credential"
            })
        }
    }
    catch(error){
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"
        });
    }
});

module.exports = router;


