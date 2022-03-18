const db = require('../knex.js');
const uuid = require('uuid');
const Joi = require('joi');
const token = require('crypto-token');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    let commande;
    let result;
   
    try{
        if(req.headers.data == null){
            commande = await db.select('id', 'mail', 'created_at', 'livraison', 'status', 'nom').from('commande').orderBy('livraison', 'asc');
            result =
                {
                    type: "collection",
                    count: commande.length,
                    commandes : commande.map(
                        item => (
                            {
                                commande: {
                                    id: item.id,
                                    mail: item.mail,
                                    nom: item.nom,
                                    created_at: item.created_at,
                                    livraison: item.livraison,
                                    status: item.status,
                                    links: {
                                        self : {
                                            href: "http://localhost:3333/commandes/" + item.id
                                        }
                                    }
                                }
                            }
                        ))
                }
            res.status(200).json(result)
        }
        else if(JSON.parse(req.headers.data).s){
            commande = await db.select('id', 'mail', 'created_at', 'livraison', 'status', 'nom').from('commande').where("status", "=", JSON.parse(req.headers.data).s).orderBy('livraison', 'asc');
            result =
                {
                    type: "collection",
                    count: commande.length,
                    commandes : commande.map(
                        item => (
                            {
                                commande: {
                                    id: item.id,
                                    mail: item.mail,
                                    nom: item.nom,
                                    created_at: item.created_at,
                                    livraison: item.livraison,
                                    status: item.status,
                                    links: {
                                        self : {
                                            href: "http://localhost:3333/commandes/" + item.id
                                        }
                                    }
                                }
                            }
                        ))
                }
            res.status(200).json(result)
        }
        else if(JSON.parse(req.headers.data).page && JSON.parse(req.headers.data).size)
        {
            let page = JSON.parse(req.headers.data).page;
            let size = JSON.parse(req.headers.data).size;
            let commande_page = await db.select('id', 'mail', 'created_at', 'livraison', 'status', 'nom').from('commande')
            let page_total = Math.ceil(commande_page.length/size)
            let next = parseInt(page) + 1;
        
            if((page > 0) && (page <= page_total)){
                commande = await db.select('id', 'mail', 'created_at', 'livraison', 'status', 'nom').from('commande').paginate({perPage: size, currentPage: page})
                
                if(page == 1){
                   
                    result =
                        {
                            type: "collection",
                            count: commande.data.length,
                            size: size,
                            links: {
                                next : {
                                    href: "http://localhost:3333/commandes/?page=" + next + "&size=" + size
                                },
                                prev : {
                                    href: "http://localhost:3333/commandes/?page=" + 1 + "&size=" + size
                                },
                                last : {
                                    href: "http://localhost:3333/commandes/?page=" + page_total + "&size=" + size
                                },
                                first : {
                                    href: "http://localhost:3333/commandes/?page=" + 1 + "&size=" + size
                                }
                            },
                            commandes : commande.data.map(
                                item => (
                                    {
                                        commande: {
                                            id: item.id,
                                            mail: item.mail,
                                            nom: item.nom,
                                            created_at: item.created_at,
                                            livraison: item.livraison,
                                            status: item.status,
                                            links: {
                                                self : {
                                                    href: "http://localhost:3333/commandes/" + item.id
                                                }
                                            }
                                        }
                                    }
                                ))
                        }
                    res.status(200).json(result)
                }
                else {
                    result =
                        {
                            type: "collection",
                            count: commande.data.length,
                            size: size,
                            links: {
                                next: {
                                    href: "http://localhost:3333/commandes/?page=" + next + "&size=" + size
                                },
                                prev: {
                                    href: "http://localhost:3333/commandes/?page=" + (page - 1) + "&size=" + size
                                },
                                last: {
                                    href: "http://localhost:3333/commandes/?page=" + page_total + "&size=" + size
                                },
                                first: {
                                    href: "http://localhost:3333/commandes/?page=" + 1 + "&size=" + size
                                }
                            },
                            commandes: commande.data.map(
                                item => (
                                    {
                                        commande: {
                                            id: item.id,
                                            mail: item.mail,
                                            nom: item.nom,
                                            created_at: item.created_at,
                                            livraison: item.livraison,
                                            status: item.status,
                                            links: {
                                                self: {
                                                    href: "http://localhost:3333/commandes/" + item.id
                                                }
                                            }
                                        }
                                    }
                                ))
                        }
                    res.status(200).json(result)
                }
            }
            else if(page <= 0)
            {
                commande = await db.select('id', 'mail', 'created_at', 'livraison', 'status', 'nom').from('commande').paginate({perPage: size, currentPage: 1})
               
                result =
                    {
                        type: "collection",
                        count: commande.data.length,
                        size: size,
                        links: {
                            next : {
                                href: "http://localhost:3333/commandes/?page=" + 2 + "&size=" + size
                            },
                            prev : {
                                href: "http://localhost:3333/commandes/?page=" + 1 + "&size=" + size
                            },
                            last : {
                                href: "http://localhost:3333/commandes/?page=" + page_total + "&size=" + size
                            },
                            first : {
                                href: "http://localhost:3333/commandes/?page=" + 1 + "&size=" + size
                            }
                        },
                        commandes : commande.data.map(
                            item => (
                                {
                                    commande: {
                                        id: item.id,
                                        mail: item.mail,
                                        nom: item.nom,
                                        created_at: item.created_at,
                                        livraison: item.livraison,
                                        status: item.status,
                                        links: {
                                            self : {
                                                href: "http://localhost:3333/commandes/" + item.id
                                            }
                                        }
                                    }
                                }
                            ))
                    }
                res.status(200).json(result)
            }
            else if(page > page_total)
            {
                commande = await db.select('id', 'mail', 'created_at', 'livraison', 'status', 'nom').from('commande').paginate({perPage: size, currentPage: page_total})
               
                result =
                    {
                        type: "collection",
                        count: commande.data.length,
                        size: size,
                        links: {
                            next : {
                                href: "http://localhost:3333/commandes/?page=" + page_total + "&size=" + size
                            },
                            prev : {
                                href: "http://localhost:3333/commandes/?page=" + 1 + "&size=" + size
                            },
                            last : {
                                href: "http://localhost:3333/commandes/?page=" + page_total + "&size=" + size
                            },
                            first : {
                                href: "http://localhost:3333/commandes/?page=" + 1 + "&size=" + size
                            }
                        },
                        commandes : commande.data.map(
                            item => (
                                {
                                    commande: {
                                        id: item.id,
                                        mail: item.mail,
                                        nom: item.nom,
                                        created_at: item.created_at,
                                        livraison: item.livraison,
                                        status: item.status,
                                        links: {
                                            self : {
                                                href: "http://localhost:3333/commandes/" + item.id
                                            }
                                        }
                                    }
                                }
                            ))
                    }
                res.status(200).json(result)
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


