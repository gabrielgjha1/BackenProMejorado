const Usuarios = require('../models/usuario')
const Medicos = require('../models/medicos')
const Hospitales = require('../models/hospital');


const buscarTodo= async (req,res)=>{

    const busqueda = req.params.busqueda;
    console.log(busqueda)
    
    const expR = new RegExp(busqueda,'i'); 

    try {
        
        const [ usuarios,medicos,hospitales ] = await Promise.all([
    
            Usuarios.find({nombre:expR}),
    
            Medicos.find({nombre:expR}).populate('hospitales'),
    
            Hospitales.find({nombre:expR}).populate('usuario'),
    
        ]);
    
        return res.status(200).json({
            status:true,
            mensaje:"hola",
            usuarios,
            medicos,
            hospitales
        });
    
    } catch (error) {
        
       
    }
}


const buscarColeccion = async (req,res)=>{
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    console.log(tabla)
    const expR = new RegExp(busqueda,'i'); 
    
    let data = [];
    
    try {
        
        switch (tabla) {
            case 'usuarios':
                
                 data = await  Usuarios.find({nombre:expR})
        
                break;
    
            case 'medicos':
            
                 data  = await Medicos.find({nombre:expR})
    
               
                break;
    
            case 'hospitales':
    
                 data  =await  Hospitales.find({nombre:expR}).populate('usuario','email nombre img')
                
                break;
        
            default:

                return res.status(400).json({
                    status:false,
                    mensaje:"No selecciono una tabla correcta",
                   
                });

        }

        return res.status(200).json({
            status:true,
            mensaje:"hola",
            data
        });

    } catch (error) {
        
        return res.status(500).json({
            status:false,
            mensaje:"Servidor revento",
           
        });

    }



}


module.exports = {
    buscarTodo,
    buscarColeccion 

}