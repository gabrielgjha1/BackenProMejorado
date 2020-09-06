
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req,res,next)=>{

    const token = req.header('token');


    if (!token){


        return res.status(401).json({

            stauts:false,
            mensaje:'NO mando el token'

        });
    }


    try {

        const {_id,usuario} = jwt.verify(token,process.env.JWT_SECRET);
        req._id=_id;
        req.usuario=usuario;
        next();

    } catch (error) {

        return res.status(401).json({

            stauts:false,
            mensaje:'TOken no valido'

        });

    }
    

}

const validarAdminRol = async (req,res,next)=>{

    const id = req._id;

    try {
        
        const usuario = await Usuario.findById(id);

        if (!usuario){
            return res.status(404).json({

                status:false,
                mensaje:'El usuario no existe'

            });
        }

        if (usuario.role !== 'ADMIN_ROLE'){
            return res.status(403).json({

                status:false,
                mensaje:'No tiene permiso para realizar esta acción'


            });
        }

        next();

    } catch (error) {
         return res.status(500).json({

            stauts:false,
            mensaje:'Hable con el administrador'

        });
    }


}


module.exports={

    validarJWT,
    validarAdminRol

}