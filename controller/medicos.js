const Medicos = require('../models/medicos');

const ConsultarMedicos = async (req,res)=>{

    const desde = Number(req.query.desde || 0);

    try {
      

        const [medicos,Total] = await Promise.all([
            await Medicos.find({}).populate('usuarios','nombre img').populate('hospitales','nombre img')
            .skip(desde).limit(5),

            await Medicos.count()
        ]);

        return res.status(200).json({
            stauts:true,
            mensaje:'Medicos',
            medicos,
            Total
        })

    } catch (error) {
        
        return res.status(500).json({
            stauts:false,
            mensaje:'Error en el servidor',
            
        })

    }


}


const GuardarMedicos = async (req,res)=>{

    const id =  req._id;

    const medico = new Medicos({
        usuarios:id,
        ...req.body
    });

    try {
        
        const medicos = await medico.save();

        return res.status(200).json({
            stauts:true,
            mensaje:'Medicos',
            medicos
        });


    } catch (error) {

        return res.status(500).json({
            stauts:false,
            mensaje:'Error en el servidor',
            
        });
        
    }

}

const borrarMedicos =async(req,res)=>{

    var id = req.params.id;

    try {
        
        const medicos = await Medicos.findByIdAndDelete(id);

        if (!medicos){

            return res.status(401).json({
                stauts:false,
                mensaje:'El medico no existe o esta ya esta eliminado',
                medicos
            });

        }

        return res.status(200).json({
            stauts:true,
            mensaje:'Medicos',
            medicos
        });


    } catch (error) {
        
        return res.status(500).json({
            stauts:false,
            mensaje:'Error en el servidor',
            
        });

    }

}

const ActualizarMedico = async (req,res)=>{

    const id = req.params.id;

    const body= req.body;
    console.log(id);
    try {

        const medicos = await Medicos.findByIdAndUpdate(id,body);

        if (!medicos){

            return res.status(401).json({
                stauts:false,
                mensaje:'Error, no existe el medico',
               
            });

        }

        return res.status(200).json({
            stauts:true,
            mensaje:'Medicos',
            medicos
        });

        
    } catch (error) {
        
        return res.status(500).json({
            stauts:false,
            mensaje:'Error en el servidor',
            
        });

    }

}

module.exports={

    ConsultarMedicos,
    GuardarMedicos,
    borrarMedicos,
    ActualizarMedico

}