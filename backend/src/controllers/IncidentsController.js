const conn = require('../dtbs/conn');

module.exports = {
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await conn('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async index(request, response) {
        const { page = 1 } = request.query;
        const [count] = await conn('incidents') // [var] pega a primeira posição do array
            .select('*')
            .count();

        const incidents = await conn('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .select(['incidents.*', 'ongs.name', 'ongs.city', 'ongs.uf', 'ongs.whatsapp', 'ongs.email'])
            .offset((page - 1) * 5)
            .limit(5);
        
            response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await conn('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not allowed.' });
        }

        await conn('incidents')
            .where('id', id)
            .delete();

        return response.status(204).send();
    }
};