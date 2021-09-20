const axios = require('axios')
const statusOK = {code: 200, description: 'OK'}
const statusErr = {code: 400, description: 'Bad Request'}

module.exports.postRequests = async (req, res) => {
    const host = getServiceName(req.url.split('/')[2])
    if (host) {
        try {
            const requestToService = await axios.post(host + req.url, req.body, {headers: req.headers})
            return res.status(requestToService.status).json(requestToService.data)
        } catch (error){
            return res.status(statusErr.code).json(error.response.data)
        }
    }
    return res.status(statusErr.code).json({message: 'Invalid service'})
}
module.exports.getRequests = async (req, res) => {
    const host = getServiceName(req.url.split('/')[2])
    if (host) {
        try {
            const requestToService = await axios.get(host + req.url, req.body, {headers: req.headers})
            return res.status(requestToService.status).json(requestToService.data)
        } catch (error){
            return res.status(statusErr.code).json(error.response.data)
        }
    }
    return res.status(statusErr.code).json({message: 'Invalid service'})
}
function getServiceName(URL) {
    switch (URL) {
    case 'message':
        return process.env.MESSAGE_SERVICE
        break;
    case 'auth':
        return process.env.REGISTRATION_SERVICE
        break;
    case 'blog':
        return process.env.BLOG_SERVICE
        break;
    default: return undefined
}

}