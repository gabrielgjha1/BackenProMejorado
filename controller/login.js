const Usuario = require('../models/usuario');
var bcrypt = require('bcryptjs');
const  {generarJWT} = require('../helpers/jwt');
const  {googleVerify} = require('../helpers/google-verify');
const  { findById } = require('../models/usuario');
const  {getMenuFront} = require('../helpers/menu-ft');
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
        const token =  await generarJWT(usuario._id,usuario );

        return  res.status(200).json({
            status:true,
            mensaje:'Logeado',
            usuario,
            token,
            menu:getMenuFront(usuario.role)
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
           google:true,
           
       })

      
   }else{
    
    usuario = usuarioDB;
    usuario.google=true;
    usuario.password='@@@';
   }
  
   await usuario.save();

    //generar token
    const token =  await generarJWT(usuario._id,usuario );
  
    


        return  res.status(200).json({
            status:true,
            mensaje:'Logeado',
            token,
            menu:getMenuFront(usuario.role)
        });
    } catch (error) {

        return  res.status(500).json({
            status:false,
            mensaje:'Tokens no es correcto',
            error
        });

    }



}


const renewToken = async (req,res)=>{
    

    
    const  id = req._id;
  
    const token =  await generarJWT(id);

    const usuario = await Usuario.findById(id);
   
    
    res.status(200).json({
        status:true,
        token,
        usuario,
        menu:getMenuFront(usuario.role)
    })



}


module.exports = {

    consulta,
    googleSingIn,
    renewToken 
}