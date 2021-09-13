const express = require('express')
const router = express.Router()
const statusErr = {code: 400, description: 'Bad Request'}
const axios = require("axios");

router.post('/api/*',
        async function (req, res) {
            let host;
            switch (req.url.split('/')[2]) {
                case 'message':
                    host = process.env.MESSAGE_SERVICE
                    break;
                case 'auth':
                    host = process.env.REGISTRATION_SERVICE
                    break;
                case 'blog':
                    host = process.env.BLOG_SERVICE
                    break;
                default: host = undefined
            }
            if (host) {
                try {
                    const requestToService = await axios.post(host + req.url, req.body, {headers: req.headers})
                    return res.status(requestToService.status).json(requestToService.data)
                } catch (error){
                    return res.status(400).json(error.response.data)
                }
            }
            return res.status(statusErr.code).json({message: 'Invalid service'})
    })
module.exports = router