const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        const ongs = await connection('ongs').select('*'); // Seleciona todas as nossas colunas da tabela 'ongs'.
       
        return res.json(ongs)
    },

    async create(req, res){
    const { name, email, whatsapp, city, uf } = req.body
    const id = generateUniqueId();

    await connection('ongs').insert({ // Para inserir os campos a seguir na tabela ongs.
        id,
        name,
        email,
        whatsapp,
        city,
        uf    
    })

    return res.json({ id });
}
}; 