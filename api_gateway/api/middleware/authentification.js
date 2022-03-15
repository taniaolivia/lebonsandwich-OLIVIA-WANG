const db = require('../knex.js');
const uuid = require('uuid');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'my_secret_key', (err, user) => {
            if(err)
            {
                res.status(500).json({
                    error: "Not Authorized"
                });
                throw new Error("Not Authorized");
            }
            req.user = user;
            next();
        });
    } else {
        res.status(500).json({
            error: "Not Authorized"
        });
        throw new Error("Not Authorized");
    }
};

module.exports = authenticateJWT;