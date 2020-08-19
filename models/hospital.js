const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HospitalSchema = new Schema({
    nombre:{ type:String,require:true },
    img:{type:String },
    usuario:{type:Schema.Types.ObjectId,ref:'Usuarios',required:true}
});

module.exports = mongoose.model('Hospitales',HospitalSchema);
