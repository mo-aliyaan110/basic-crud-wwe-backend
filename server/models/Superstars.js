const mongoose = require('mongoose');
const superstarSchema = new mongoose.Schema({
    superstarname:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    }
    
})
const superstarModel = mongoose.model('superstars', superstarSchema);

module.exports = superstarModel;