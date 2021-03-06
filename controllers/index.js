'use strict';

const express = require('express'),
      router = express.Router(),
      Article = require('../models/article');

router.get('/', (req, res) => {
    Article
        .find({})
        .where('saved').equals(false)
        .where('deleted').equals(false)
        .sort('-date')
        .limit(20)
        .exec(function(error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObj = {
                    title: 'All the News That\'s Fit to Scrape',
                    subtitle: 'Get your gaming news here!',
                    articles: articles
                };
                res.render('index', hbsObj);
            }
        });
});

router.get('/saved', (req, res) => {
    Article
        .find({})
        .where('saved').equals(true)
        .where('deleted').equals(false)
        .sort('-date')
        .exec(function(error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObj = {
                    title: 'All the News That\'s Fit to Scrape',
                    subtitle: 'Get your gaming news here!',
                    articles: articles
                };
                res.render('saved', hbsObj);
            }
        });
});

router.use('/api', require('./api'));

module.exports = router;