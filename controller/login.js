const Usuario = require('../models/usuario');
var bcrypt = require('bcryptjs');
const  {generarJWT} = require('../helpers/jwt');
const  {googleVerify} = require('../helpers/google-verify');
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

const googleSingIn = async (req,res)=>{
    const googleToken = req.body.token;
    
    try {
   const datos =  await googleVerify(googleToken);
   
   const usuarioDB =await Usuario.findOne({email:datos.email});
   let usuario;

   if (!usuarioDB){
       usuario = new Usuario({
           ...datos,
           password:'@@@',
           google:true
       })
   }else{

    usuarioDB = usuarioDB;
    usuario.google=true;

   }

   await usuario.save();

    //generar token
    const token =  await generarJWT(usuario._id );



        return  res.status(200).json({
            status:true,
            mensaje:'Logeado',
            token
        });
    } catch (error) {

        return  res.status(500).json({
            status:false,
            mensaje:'Token no es correcto',
            error
        });

    }



}

module.exports = {

    consulta,
    googleSingIn
}