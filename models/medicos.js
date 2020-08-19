const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MedicosSechema = new Schema ({

    nombre:{type:String,required:true},
    img:{type:String},
    usuarios:{type:Schema.Types.ObjectId,ref:'Usuarios'},
    hospitales:{type:Schema.Types.ObjectId,ref:'Hospitales',required:true}

})

module.exports = mongoose.model('Medicos',MedicosSechema);