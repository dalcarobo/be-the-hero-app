const conn = require('../dtbs/conn');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;
        const incidents = await conn('incidents').select('*').where('ong_id', ong_id);
        return response.json(incidents);
    }

    
};