
const Usuario = require('../models/usuario'); 
var bcrypt = require('bcryptjs');
const {  validationResult } = require('express-validator');
const  {generarJWT} = require('../helpers/jwt');

const GetUsuarios = async (req,res)=>{

    const desde = Number(req.query.desde || 0);
   
    

    try {

       const [usuarios,Total] = await  Promise.all([
            await Usuario.find( {},'nombre email role img google' ).skip(desde).limit(5),
            await Usuario.count()
        ])
    return res.status(200).json({
        usuarios,
        status:'ok',
        Total

    });

    } catch (error) {

      return  res.status(500).json({
            Mmensaje:"Error el servidor revento",
            status:false
    
        });

    }
  
}


const CrearUSuario = async (req,res)=>{
  
    const {email,password} = req.body;

    const errores = validationResult(req);

    if (!errores.isEmpty()){

        return res.status(400).json({

            status:false,
            mensaje:"Faltaron algunos campos",
            error:errores.mapped()
        });

    }

    try {

       const ExiteEmail = await Usuario.findOne({email});

       if (ExiteEmail){

       return res.status(400).json({

            status:false,
            mensaje:"EL correo existe"
        });

       }
       
       var salt = bcrypt.genSaltSync();

       
       
       const usuario = new Usuario(req.body);
       
       usuario.password = bcrypt.hashSync(password, salt);
       
       const usuarioSave = await usuario.save();

       const token =  await generarJWT(usuario._id );

       return res.status(200).json({

            status:'ok',
            usuarios:usuarioSave,
            token
        });

    } catch (error) {

      return  res.status(500).json({
            Mmensaje:"Error, el servidor revento",
            status:false
    
        });

        
    }

  
}


const actualizarUsuario = async (req,res)=>{

    const id = req.params.id;
    
    const usuario = req.body;

    
    //verificar si el correo esta registrado

    try {

        const VerificarEmail = await Usuario.findById(id);
        
        if (usuario.email==VerificarEmail.email){
            delete usuario.email;
            
        }else{
            
            const correoUsado = await Usuario.findOne({email:usuario.email});
        
                if (correoUsado){
        
                    return res.status(404).json({
        
                        status:false,
                        mensaje:'El email ya esta registrado'
        
                });
            }
    
        }

    } catch (error) {
        
        return  res.status(500).json({
            Mmensaje:"Error, el servidor revento",
            status:false
    
        });
        

    }

    

//guardar los datos actualizados
    try {
        
      const UsuarioActualizado = await Usuario.findByIdAndUpdate(id,usuario,{new:true});

      if (!UsuarioActualizado){
        
        return  res.status(400).json({
            Mmensaje:"EL id no exite ",
            status:false
    
        });

      }

      return res.status(200).json({

        status:'ok',
        usuarios:UsuarioActualizado
    });


    } catch (error) {

        return  res.status(500).json({
            Mmensaje:"Error, el servidor revento",
            status:false
    
        });
        
    }


}

const BorrarUsuario = async (req,res)=>{

    var id = req.params.id;
    try {
        
        const usuarios = await Usuario.findByIdAndDelete(id);

        if (!usuarios){
             
            return  res.status(400).json({
                Mmensaje:"El usuario no existe ",
                status:false
        
            });

        }

        return res.status(200).json({

            status:'ok',
            usuarios:usuarios
        });


    } catch (error) {

        return  res.status(500).json({
            Mmensaje:"Error, el servidor revento",
            status:false
    
        });
        
    }


}

module.exports = {

    GetUsuarios,
    CrearUSuario,
    actualizarUsuario,
    BorrarUsuario

}