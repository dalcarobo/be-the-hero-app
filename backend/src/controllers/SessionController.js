const conn = require('../dtbs/conn');

module.exports = {
    async index(request, response) {
        const { id } = request.body;

        const ong = await conn('ongs').select('name').where('id', id).first();

        if (!ong) {
            response.status(400).json({ error: "Nenhuma ONG encontrada." });
        }

        return response.json(ong);
    }
}