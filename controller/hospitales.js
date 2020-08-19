const Hospitales = require('../models/hospital');

const ConsultarHospitales = async (req,res)=>{

    const desde = Number(req.query.desde || 0) ;

    try {
        
        const [hospitales,total] = await Promise.all([
            await Hospitales.find({}).populate('usuario','email nombre img')
                                                    .skip(desde).limit(5),
           await Hospitales.count()
        ]);

         return res.status(200).json({
            stauts:true,
            mensaje:'hospitales',
            hospitales,
            total
        })

    } catch (error) {
        return res.status(500).json({
            stauts:false,
            mensaje:'Error en el servidor',
            
        })
    }


}

const GuardarHospitales = async (req,res)=>{
    const _id = req._id;
    const hospitales = new Hospitales({
        ...req.body,
        usuario:_id
    });
    
    try {
    
        const hospital = await hospitales.save();

        return res.status(200).json({
            stauts:true,
            mensaje:'Hospital Guardado',
            hospitales:hospital
        })

    } catch (error) {

        return res.status(500).json({
            stauts:false,
            mensaje:'Error en el servidor',
            error
        })
        
    }

}

const EliminarHospitales = async (req,res )=>{

    const id = req.params.id;
    console.log(id)
    try {
        
        const hospitales = await  Hospitales.findByIdAndDelete(id);
        
        if (!hospitales){

            return res.status(401).json({
                stauts:false,
                mensaje:'El hospital no existe o esta eliminado',
                
            })

        }

        return res.status(200).json({
            stauts:true,
            mensaje:'Hospital eliminado',
            hospitales
        })


    } catch (error) {

        return res.status(500).json({
            stauts:false,
            mensaje:'Error en el servidor',
            error
        })
        
    }

}


const ActualizarHospitales = async (req,res)=>{

    const id = req.params.id;
    const body = req.body;

    try {
        
        const hospitales = await Hospitales.findByIdAndUpdate(id,body);

        if (!hospitales){

            return res.status(401).json({
                stauts:false,
                mensaje:'El hospital no existe ',
                
            })

        }

        return res.status(200).json({
            stauts:true,
            mensaje:'Hospital Actualizado',
            hospitales
        })


    } catch (error) {
        
        return res.status(500).json({
            stauts:false,
            mensaje:'Error en el servidor',
            error
        });

    }


}


module.exports = {
    ConsultarHospitales,
    GuardarHospitales,
    EliminarHospitales,
    ActualizarHospitales
}