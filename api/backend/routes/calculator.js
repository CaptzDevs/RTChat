const express = require('express')
const router = express.Router()
const url = require('url');
const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio');
const puppeteer = require('puppeteer')
const path = require('path');

axios.defaults.baseURL = 'http://localhost:3000/';

router.get('/', (req, res) => {

    var data = {

        message: 'Welcome to our Calculator Service'

    };

    res.send(data)

})

//Add route
router.get('/calculator/add/:num1/:num2', (req, res) => {
    const num1 = parseInt(req.params.num1)
    const num2 = parseInt(req.params.num2)
    var data = {
        answer: num1 + num2
    };
    res.send(data)
})

//Sub route
router.get('/calculator/sub/:num1/:num2', (req, res) => {
    const num1 = parseInt(req.params.num1)
    const num2 = parseInt(req.params.num2)
    var data = {
        answer: num1 - num2
    };
    res.send(data)
})

//Multi route
router.get('/calculator/multi/:num1/:num2', (req, res) => {
    const num1 = parseInt(req.params.num1)
    const num2 = parseInt(req.params.num2)
    var data = {
        answer: num1 * num2
    };
    res.send(data)
})

//Div route
router.get('/calculator/div/:num1/:num2', (req, res) => {
    const num1 = parseInt(req.params.num1)
    const num2 = parseInt(req.params.num2)

    if(num1 === 0 || num2 === 0){
        res.send({error : 'Number must be greater than 0'})
        return 0;
    }

    var data = {
        answer: num1 / num2
    };
    res.send(data)
})


module.exports = router