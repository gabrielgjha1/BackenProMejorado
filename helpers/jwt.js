const jwt = require('jsonwebtoken');


const generarJWT = (_id,usuario)=>{

    return new Promise ((resolve,rejec)=>{

        const payload = {
            _id,
            usuario
        }
    
        jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:'12h'
            
        },(err,token)=>{
    
            if (err){
                console.log(err);
                rejec('No se pudo generar el jwt');
            }else {
                resolve(token);
            }

    
        });
    })


}

module.exports ={
    generarJWT
}