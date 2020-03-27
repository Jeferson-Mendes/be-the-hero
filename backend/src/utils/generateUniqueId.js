const crypto = require ('crypto');

module.exports = function genateUniqueId(){
    return crypto.randomBytes(4).toString('HEX'); //Gera 4 bytes de caracteres hexadecimais, o que gerará o nosso id.
}