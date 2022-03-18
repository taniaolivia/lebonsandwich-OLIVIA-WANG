const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/sandwich/:id', async (req, res, next) => {
    let id = req.params.id;

    try{
        const result = await axios
            .get('http://directus:8055/items/sandwich/' + id);
        
        res.json(result.data);
    }
    catch(error){
        next(error);
    }
});


router.get('/sandwich', async (req, res, next) => {
    try{
        const result = await axios
            .get('http://directus:8055/items/sandwich');
        
        res.json(result.data);
    }
    catch(error){
        next(error);
    }
});

router.post('/sandwich', async (req, res, next) => {
    try{
        let categories = req.body.categories;
        let reqCateg = categories.map(
            item => ({
                id: item.id
            })
        );
        let data = {
            id: req.body.id,
            nom: req.body.nom,
            description: req.body.description,
            type_pain: req.body.type_pain,
            image: req.body.image,
            categories: reqCateg,
            prix: req.body.prix
        }
        console.log(data);
        const result = await axios
            .post('http://directus:8055/items/sandwich', data);
        
        res.json(result.data);
    }
    catch(error){
        console.log(error)
        next(error);
    }
});

router.get('/category', async (req, res, next) => {
    try{
        const result = await axios
            .get('http://directus:8055/items/category');
        
        res.json(result.data);
    }
    catch(error){
        console.log(error)
        next(error);
    }
});

router.post('/category', async (req, res, next) => {
    try{
        let data = {
            id: req.body.id,
            nom: req.body.nom,
            description: req.body.description
        }
        const result = await axios
            .post('http://directus:8055/items/category', data);
        
        res.json(result.data);
    }
    catch(error){
        console.log(error)
        next(error);
    }
});

router.get('/category/:id', async (req, res, next) => {
    let id = req.params.id;
    try{
        const result = await axios
            .get('http://directus:8055/items/category/' + id);
        
        res.json(result.data);
    }
    catch(error){
        console.log(error)
        next(error);
    }
});

router.get('/commandes', async (req, res, next) => {
    try{
        const result = await axios
            .get('http://commandes:3000/commandes');
        
        res.json(result.data);
    }
    catch(error){
        next(error);
    }
});

router.post('/commandes', async (req, res, next) => {
    try{
        let items = req.body.items;
        let reqItem = items.map(
            item => ({
                uri: item.uri, 
                quantite: item.q, 
                libelle: item.libelle, 
                tarif: item.tarif
            })
        );
        let livraison =  {
            date: req.body.livraison.date,
            heure: req.body.livraison.heure
        };

        const result = await axios
            .post('http://commandes:3000/commandes', {},
            {
                headers: {
                    nom: req.body.nom,
                    livraison: JSON.stringify(livraison),
                    mail: req.body.mail,
                    items: JSON.stringify(reqItem)
                }
            });
        
        res.json(result.data);
    }
    catch(error){
        console.log(error);
        next(error);
    }
});

router.get('/commandes/:id', async (req, res, next) => {
    let id = req.params.id;

    try{
        const result = await axios
            .get('http://commandes:3000/commandes/' + id);
        
        res.json(result.data);
    }
    catch(error){
        next(error);
    }
});

router.put('/commandes/:id', async (req, res, next) => {
    let id = req.params.id;
    let livraison =  {
        date: req.body.livraison.date,
        heure: req.body.livraison.heure
    };

    try{
        const result = await axios
            .put('http://commandes:3000/commandes/' + id, {},
            {
                headers: {
                    nom: req.body.nom,
                    livraison: JSON.stringify(livraison),
                    mail: req.body.mail
                }
            });
        
        res.json(result.data);
    }
    catch(error){
        next(error);
    }
});

router.get('/commandes/:id/items', async (req, res, next) => {
    let id = req.params.id;

    try{
        const result = await axios
            .get('http://commandes:3000/commandes/' + id + '/items');
        
        res.json(result.data);
    }
    catch(error){
        next(error);
    }
});


module.exports = router;


