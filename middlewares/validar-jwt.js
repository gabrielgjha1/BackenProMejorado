
const jwt = require('jsonwebtoken');

const validarJWT = (req,res,next)=>{

    const token = req.header('token');
    console.log(token);
    if (!token){


        return res.status(401).json({

            stauts:false,
            mensaje:'NO mando el token'

        });
    }


    try {
        const {_id} = jwt.verify(token,process.env.JWT_SECRET);
        req._id=_id;
    } catch (error) {

        return res.status(401).json({

            stauts:false,
            mensaje:'TOken no valido'

        });

    }
    
  

    



    next();
}

module.exports={

    validarJWT

}