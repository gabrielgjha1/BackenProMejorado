const Usuario = require('../models/usuario');
var bcrypt = require('bcryptjs');
const  {generarJWT} = require('../helpers/jwt');
const consulta = async (req,res)=>{

    const body = req.body;
 
    try {
        
        const usuario = await Usuario.findOne({email:body.email});
    
        if (!usuario){
    
          return  res.status(404).json({
                status:false,
                mensaje:'Correo incorrecto'
    
            });
    
        }

        const ValidarPassword = bcrypt.compareSync(body.password,usuario.password);

        if (!ValidarPassword){
            
            return  res.status(404).json({
                status:false,
                mensaje:'COntraseña incorrecta'
    
            });
        }

        //generar token
        const token =  await generarJWT(usuario._id );

        return  res.status(200).json({
            status:true,
            mensaje:'Logeado',
            usuario,
            token
        });

    

    } catch (error) {
        
    }
    

}


module.exports = {

    consulta

}