const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { id } = request.body;

        const ong = await connection('ongs') // Nome da ong onde o id é igual aquele do request.body
            .where('id', id) 
            .select('name')
            .first();

        if (!ong) { // Caso não encontre...
            return response.status(400).json( {error: 'No ONG found with this ID'} );
        }
        return response.json(ong);
    }

}