var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = mongoose.Schema

var  UsuarioSchema = new Schema({

    nombre:{ type:String,require:true },
    email:{type:String,require:true,unique:true },
    password:{type:String,require:true },
    img:{type:String },
    role:{type:String,require:true,default:'USER_ROLE'  },
    google:{type:Boolean,default:false},

})

module.exports = mongoose.model('Usuarios',UsuarioSchema);