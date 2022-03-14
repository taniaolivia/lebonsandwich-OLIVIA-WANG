const db = require('../knex.js');
const uuid = require('uuid');
const express = require('express');
const router = express.Router();
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/verification');


router.post('/', async (req, res) => {
    let nom = req.body.nom_client;
    let passwd = req.body.passwd;
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

router.get('/signin', auth, async (req, res) => {
    try{
        res.redirect('http://localhost:3335/auth/signup');
    }
    catch(error){
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"
        });
    }
});

router.get('/signup', auth, async (req, res) => {
    try{
        return res.redirect('http://localhost:3334/suivi_commandes');
    }
    catch(error){
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"
        });
    }
});

router.post('/signup', auth, async (req, res) => {
    let user;

    try{
        user = await db("client").insert({
            nom_client: req.body.nom_client,
            mail_client: req.body.mail_client,
            passwd: req.body.passwd
        });
     
        return res.status(201).json({
            message: "User is created successfully!"
        });
    }
    catch(error){
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"
        });
    }
});



/*router.get("*", (req,res)=>{
    res.status(400).json({
        type: "error",
        error: "400",
        message: "la requête " + req.url + " est mal formée"});
});*/


/*router.use((req, res)=>{
    res.json({
        type: "error",
        error: "405",
        message: "erreur de type 405 Method Not Allowed"
    })
});*/

module.exports = router;


