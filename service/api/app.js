const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hateoasLinker = require('express-hateoas-links');
const db = require('./knex.js');

const indexRouter = require('./routes/index');
const e = require('express');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(hateoasLinker);


app.use('/', indexRouter);

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/commandes', async (req, res) => {
    let commande;
    let result;

    try{
        commande = await db.select('id', 'mail', 'created_at', 'montant').from('commande');
        result = {
            type: "collection",
            count: commande.length,
            commandes: commande
        }
        res.status(200).json(result);
    } 
    catch(error){
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"
        });
    };
});

app.get('/commandes/:id', async (req, res) => {
    let id = req.params.id;
    let embed = req.query.embed; 
    let commande;
    let items;
    let result;
    
    try{
        commande = await db.select('id', 'nom', 'mail', 'created_at', 'livraison', 'montant' ).from('commande').where('id', '=', id);

        if(!commande[0])
        {
           res.status(404).json({
               type: "error",
               error: "404",
               message: "ressource non disponible : /commandes/" + id});
        }
        else{
            if(!embed)
            {
                result = {
                    type: "resource",
                    commande: {
                        id: commande[0].id,
                        mail: commande[0].mail,
                        nom: commande[0].nom,
                        date_commande: commande[0].created_at,
                        date_livraison: commande[0].livraison,
                        montant: commande[0].montant
                    }
                }
                res.status(200).json(result, [
                    {
                        items: {
                            href: "http://localhost:3333/commandes/" + commande[0].id + "/items"
                        },
                        self : {
                            href: "http://localhost:3333/commandes/" + commande[0].id
                        }
                    }
                ]);
            }
            else{
                
                items = await db.select('id', 'libelle', 'tarif', 'quantite').from('item').where('command_id', '=', commande[0].id);

                result = {
                    type: "resource",
                    commande: {
                        id: commande[0].id,
                        mail: commande[0].mail,
                        nom: commande[0].nom,
                        date_commande: commande[0].created_at,
                        date_livraison: commande[0].livraison,
                        montant: commande[0].montant,
                        items: items
                    }
                }
                res.status(200).json(result, [
                    {
                        items: {
                            href: "http://localhost:3333/commandes/" + commande[0].id + "/items"
                        },
                        self : {
                            href: "http://localhost:3333/commandes/" + commande[0].id
                        }
                    }
                ]);
            }
        }
    } 
    catch(error){
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"
        });
    };       
});


app.put('/commandes/:id', async (req, res) => {
    let id = req.params.id;
    let commande;
    let update;
    
    try{
        commande = await db.select('id', 'nom', 'mail', 'created_at', 'livraison', 'montant' ).from('commande').where('id', '=', id);

        if(!commande[0])
        {
           res.status(404).json({
               type: "error",
               error: "404",
               message: "ressource non disponible : /commandes/" + id});
        }
        else{
            update = await db.select('id', 'nom', 'mail', 'created_at', 'livraison', 'montant' ).from('commande').where('id', '=', id).update({
                nom: req.body.nom,
                mail: req.body.mail,
                livraison: req.body.livraison
            });
            res.status(204).json('success');
        }
    } 
    catch(error){
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"
        });
    };       
});

app.get('/commandes/:id/items', async (req, res) => {
    let id = req.params.id;    
    let commande;
    let items;
    let result;

    try {
         commande = await db.select("*").from('commande').where("id", "=", id);

         if(!commande[0])
         {
            res.status(404).json({
                type: "error",
                error: "404",
                message: "ressource non disponible : /commandes/" + id});
         }
         else{
            items = await db.select('id', 'libelle', 'tarif', 'quantite').from('item').where('command_id', '=', commande[0].id);
            result = {
                type: "collection",
                count: items.length,
                items: items
            }
            res.status(200).json(result);
         }
    } 
    catch(error){
        res.status(500).json({
            type: "error",
            error: "500",
            message: "erreur lors de la connexion à la base de données"});
    }
    
});


app.get("*", (req,res)=>{
    res.status(400).json({
        type: "error",
        error: "400",
        message: "la requête " + req.url + " est mal formée"});
});


/*app.use((req, res)=>{
    res.json({
        type: "error",
        error: "405",
        message: "erreur de type 405 Method Not Allowed"
    })
});*/

module.exports = app;
