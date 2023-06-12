const bcrypt = require('bcrypt')

const appBcrypt = {

    async encrypt(text){
        try{
            const hashedtext =  await bcrypt.hash(text,10)
            return  Promise.resolve(hashedtext)
        }catch(err){
            return Promise.reject(err)
        }

    },

    async compare(text,encryptedtext){
        const result = await bcrypt.compare(text, encryptedtext)
        return result
    }

}

module.exports = appBcrypt