const jwt = require('jsonwebtoken')

const appToken = {

    async getToken(payload){
        try{
              const secretKey = "ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5";
              
              // Generate the token
              const token = jwt.sign(payload, secretKey);
              return Promise.resolve(token)
        }catch(err){
            console.log(err)
                return Promise.reject(err)
        }

    },

    async verifyToken(token){
        const secretKey = "ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5";

        var decoded = jwt.verify(token, secretKey, (err, decodedData) => {
            if (err) {
              res.status(403).send(); // Forbidden
            }
            return decodedData
          });
       return Promise.resolve(decoded)
    },

    async checkAuthenticate(req,res,next){
        try{
            console.log('middleware')
            if(req.headers.token)
            {
             const decodeddata = await appToken.verifyToken(req.headers.token)
             if(decodeddata)
             {
                console.log(decodeddata)
              next()
             }else{
              res.status(404).json({"message":'login to access'})
             }
       
            }else{
              res.status(404).json({"message":'login to access'})
            }
    
        
        }catch(err){
          res.status(404).json({"message":"not autherized"})
        }
    }
}

module.exports = appToken

