const connection = require('../database/connection');


module.exports = {
    async index(req, res){
        const { page = 1 } = req.query;

        const [count] = await connection('incidents').count()
    
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // Join com a condição de o id de a ong ter o id na tabela incidents
            .limit(5) // Limitar para 5 incidents
            .offset(( page -1 ) * 5 ) // Pegar 5 registros por página
            .select([   // Seleciona todas as colunas da tabela incidents, e mais cinco colunas da table ongs.
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ])

        res.header('X-Total-Count', count['count(*)'])

        return res.json( incidents );
    },

    async create( request, response ) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id })
    },

    async delete(req, res){
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents') // Na nossa tabela 'incidents'
            .where('id', id) // Filtramos para que o id do nosso incident seja igual ao id do nosso req.params.  
            .select('ong_id') // Selecionamos apenas a coluna 'ong_id'
            .first() // Retorna apenas um resultado.
        
        if( incident.ong_id != ong_id ) {
            return res.status(401).json({ error: 'Operation not permitted' }) // Muda o status para 'não autorizado'.
        }
        await connection('incidents').where('id', id).delete(); // Deleta :)

        return res.status(204).send() // O status 204, se refere a uma responsta bem sucedida, mas sem conteudo. 
    }
}