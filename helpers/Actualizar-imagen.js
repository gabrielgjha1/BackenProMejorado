const Usuarios = require('../models/usuario')
const Medicos = require('../models/medicos')
const Hospitales = require('../models/hospital');
const fs = require('fs');
const ActualizarImagen = async (tipo,id,path,nombreArchivo)=>{

 const eliminarArchivo = (pathViejo)=>{

    if (fs.existsSync(pathViejo)){
        console.log(pathViejo)
        fs.unlinkSync(pathViejo);
    }

}
let pathViejo='';
    switch(tipo){

        case 'medicos':
            const medico = await Medicos.findById(id);

            if (!medico){
                console.log('No es un medico');
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;

            eliminarArchivo(pathViejo);
            

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        case 'usuarios':
            const usuario = await Usuarios.findById(id);

            if (!usuario){
                console.log('No es un usuario');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;

            eliminarArchivo(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

       case 'hospitales':

            const hospital  = await Hospitales.findById(id);

            if (!hospital){
                console.log('No es un hospital');
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;

            eliminarArchivo(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
                

        default:
            break

    }
}

module.exports = {
    ActualizarImagen
}