const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');

//@route POST/api/url/shorten
//@desc Shorten URL
router.post('/shorten', async (req,res)=> {
    const {longUrl} = req.body;
    const baseUrl = config.get('baseurl');

    //Check base Url
    if(!validUrl.isUri(baseUrl)){
        console.log('this1');
        return res.status(401).json('Invalid Url');
    }

    //Create URL code
    const urlCode = shortid.generate();

    //Check long URL
    if(validUrl.isUri(longUrl)){
        try {
            let url = await Url.findOne({longUrl});

            if(url){
                res.json(url);
            }
            else{
                const shortUrl = baseUrl + '/' + urlCode;
                
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date:new Date()

                });

                await url.save();

                res.json(url);
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json('Server Error');
        }
    }
    else{
        console.log('this2');
        res.status(401).json('Invalid Url');
    }
});

module.exports = router;